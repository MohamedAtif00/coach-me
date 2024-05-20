import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoginRequest } from '../model/Request/login.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  registerForm!: FormGroup ;
  request = new FormData();

  constructor(private authServ: AuthService, private fb: FormBuilder,private router:Router) {}

  ngOnInit(): void {
    this.authServ.allowAccessToken().subscribe(data=>{
      console.log(data);
      this.authServ.user$.subscribe(data=>{
        console.log(data);
        
      })
    })
    
    
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.registerForm);
    
    if (this.registerForm.valid) {
      
      let email = this.registerForm.get('email')?.value;
      let password = this.registerForm.get('password')?.value;
      let request:LoginRequest = {email,password}

      this.authServ.Login(request).subscribe((data:any)=>{
        console.log(data);
        if(data.value)
        this.router.navigate([''])

      });
    }
  }

  
  

}
