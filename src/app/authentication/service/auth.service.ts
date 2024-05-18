import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, tap, throwError } from "rxjs";
import { GeneralResponse } from "src/app/shared/general.response";
import { StudentLoginRequest, DonorLoginRequest } from "../model/Request/login.request";
import { StudentRegister, DonorRegister } from "../model/Request/register.request";
import { AllowAccessResponse } from "../model/Response/allow-access.response";
import { StudentLoginResponse, DonorLoginResponse } from "../model/Response/login.response";
import { StudentRegisterResponse } from "../model/Response/register.response";
import { development } from "src/environment";
import { UserModel } from "src/app/authentication/model/user.model";
import { Trainee } from "src/app/model/trainee.model";

@Injectable({
    providedIn:'root'
})
export class AuthService{


    getAllowAccess:string = `${development.localhost}Authentication/AllowAccess/`
    getCheckUsername:string = `${development.localhost}Authentication/CheckUsername/`
    postAdminLogin:string = `${development.localhost}Authentication/AdminLogin`
    getUserInformation:string = `${development.localhost}Authentication/`;
    postTraineeRegister:string = `${development.localhost}Authentication/TraineeRegister`;


    user!:UserModel | null;
    token!:string | null

    constructor(private http:HttpClient){
        
        this.token = localStorage.getItem('Token')
        if(this.token)
        this.http.get<any>(this.getAllowAccess+this.token).subscribe(data=>{
            this.user = {id:data.userId,username:data.username,email:data.email,role:data.role,token:data.token}
            //console.log('service',this.user);
        })
    }

    init()
    {
        this.token = localStorage.getItem('Token')
        if(this.token)
            return this.http.post<any>(this.getAllowAccess , {token:this.token})
        else return null

    }

    GetToken()
    {
        return localStorage.getItem('Token');
    }

    SetTokens(token:string)
    {
         localStorage.setItem('Token',token)
    }

    TraineeRegister(request:FormData)
    {
        return this.http.post<GeneralResponse<any>>(this.postTraineeRegister,request).pipe(tap(data=>{
            this.AllowAccessToken().subscribe()
        }))
    }


    
    

    // AdminLogin(login:{username:string,password:string})
    // {
    //     return this.http.post<GeneralResponse<DonorLoginResponse>>(this.postAdminLogin,login)
    //     .pipe(
    //         map((data) =>{
    //         if(data) console.log(data);
            

    //         if(data.value)
    //         {
    //             this.user = {id:data.value.userId,username:data.value.username,email:'',role:data.value.role,token:data.value.jwtToken}
    //             localStorage.setItem('User_Token_Key',data.value.jwtToken)
    //             this.token =this.GetToken()
    //         }
    //             return data
    //     })
    //     );
    // }



    AllowAccessToken(): Observable<AllowAccessResponse | null> {
        // get user data
        if(this.user)
        console.log(this.user.token);
        
        const token = this.GetToken();
      
        if (!token) {
          return of(null); // Return null if no token is available
        }
      
        const url = `${this.getAllowAccess}`;
      
        return this.http.get<AllowAccessResponse>(url+token).pipe(tap(data=>{
            // Get the data of the user from back-end
            this.user = this.user = {id:data.userId,username:data.userName,email:data.email,role:data.role,token:data.token}

        }),
          catchError(error => {
            // Handle errors appropriately (e.g., log the error, display a user-friendly message)
            console.error('Error fetching allow access:', error);
            return throwError(() => new Error('Failed to get allow access')); // Re-throw a user-friendly error
          })
        );
    }

    GetUserInformation(id:string)
    {
        return this.http.get<GeneralResponse<Trainee>>(this.getUserInformation+id);
    }
      

    CheckUsrname(username:string)
    {
        return this.http.get<boolean>(this.getCheckUsername+username);
    }

    Logout()
    {
        localStorage.removeItem('Token')
        this.user = null
        this.token = null
    }


}