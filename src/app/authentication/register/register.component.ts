import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  imageSrc = '../../assets/img/avatar.png';
  registerForm!: FormGroup ;
  request = new FormData();
  imageaSelected!:File;

  constructor(private authServ: AuthService, 
              private fb: FormBuilder,
              private router:Router) {}

  ngOnInit(): void {
    this.authServ.allowAccessToken().subscribe(data=>{
      console.log(data);
      this.authServ.user$.subscribe(data=>{
        console.log(data);
        
      })
    })
    
    
    this.registerForm = this.fb.group({
      profileImage:  ['../../../assets/image/avatar.png'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      gender: ['other', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.request = new FormData();
      this.request.append('firstName', this.registerForm.get('firstName')?.value);
      this.request.append('lastName', this.registerForm.get('lastName')?.value);
      this.request.append('email', this.registerForm.get('email')?.value);
      this.request.append('password', this.registerForm.get('password')?.value);
      this.request.append('gender',this.registerForm.get('gender')?.value);
      this.request.append('image',this.imageaSelected);

      this.authServ.TraineeRegister(this.request).subscribe(data=>{
        console.log(data);
        if(data.value)
          this.router.navigate(['']);
        
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      this.imageaSelected = file
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file); 
      console.log(reader);
      
    }
  }
  

  

}
