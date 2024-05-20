import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { GeneralResponse } from "src/app/shared/general.response";
import { AllowAccessResponse } from "../model/Response/allow-access.response";
import { StudentLoginResponse, DonorLoginResponse } from "../model/Response/login.response";
import { RegisterResponse } from "../model/Response/register.response";
import { development } from "src/environment";
import { UserModel } from "src/app/authentication/model/user.model";
import { Trainee } from "src/app/model/trainee.model";
import { LoginRequest } from "../model/Request/login.request";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = development.localhost + 'Authentication/';
  private login = development.localhost + 'Authentication/Login';
  private getAllowAccessUrl = this.apiUrl + 'AllowAccess/';
  private getCheckUsernameUrl = this.apiUrl + 'CheckUsername/';
  private postAdminLoginUrl = this.apiUrl + 'AdminLogin';
  private postTraineeRegisterUrl = this.apiUrl + 'TraineeRegister';
  private postTrainerRegisterUrl = this.apiUrl + 'TrainerRegister';

  private userSubject = new BehaviorSubject<UserModel | null>(null);
  user$ = this.userSubject.asObservable();
  private token: string | null = localStorage.getItem('Token');

  constructor(private http: HttpClient,private router:Router) {
    
    if (this.getToken()) {
      this.allowAccessToken().subscribe(data=>{
        console.log('Auth Servcie',data);
        
      });
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('Token', token);
    this.token = token;
  }

  private removeToken(): void {
    localStorage.removeItem('Token');
    this.token = null;
  }

  getToken(): string | null {
    return this.token;
  }

  setTokens(token: string): void {
    this.saveToken(token);
  }

  init(): Observable<AllowAccessResponse | null> | null {
    if (this.token) {
      return this.http.post<AllowAccessResponse>(this.getAllowAccessUrl, { token: this.token })
        .pipe(
          tap(response => this.userSubject.next({
            id: response.userId,
            username: response.username,
            email: response.emai,
            role: response.role,
            token: response.token
          })),
          catchError(this.handleError)
        );
    } else {
      return null;
    }
  }

  TraineeRegister(request: FormData): Observable<GeneralResponse<any>> {
    return this.http.post<GeneralResponse<RegisterResponse>>(this.postTraineeRegisterUrl, request)
      .pipe(
        tap((registerResponse) => {
            if(registerResponse.value) 
              {
                this.setTokens(registerResponse.value?.jwtToken)
                this.init()
              }
                
            }),
        catchError(this.handleError)
      );
  }


  TrainerRegister(request: FormData): Observable<GeneralResponse<any>> {
    return this.http.post<GeneralResponse<RegisterResponse>>(this.postTrainerRegisterUrl, request)
      .pipe(
        tap((registerResponse) => {
            if(registerResponse.value) 
              {
                this.setTokens(registerResponse.value?.jwtToken)
                this.init()
              }
                
            }),
        catchError(this.handleError)
      );
  }

  Login(request:LoginRequest)
  {
    return this.http.post<GeneralResponse<any>>(this.login,request)
    .pipe(
      tap((registerResponse) => {
          if(registerResponse.value) 
            {
              this.setTokens(registerResponse.value?.jwtToken)
              this.init()
            }
              
          }),
      catchError(this.handleError)
    );
  }


  

  allowAccessToken(): Observable<AllowAccessResponse | null> {
    if (!this.token) {
      return of(null);
    }
    return this.http.get<AllowAccessResponse>(this.getAllowAccessUrl + this.token)
      .pipe(
        tap(response => {
          this.userSubject.next({
            id: response.userId,
            username: response.username,
            email: response.emai,
            role: response.role,
            token: response.token
          });
        }),
        catchError(this.handleError)
      );
  }

  getUserInformation(id: string): Observable<GeneralResponse<Trainee>> {
    return this.http.get<GeneralResponse<Trainee>>(this.apiUrl + id)
      .pipe(catchError(this.handleError));
  }

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(this.getCheckUsernameUrl + username)
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    this.removeToken();
    this.userSubject.next(null);
    this.router.navigate([''])
  }

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
