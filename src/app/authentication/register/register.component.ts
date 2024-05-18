import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  imageSrc = '../../assets/img/avatar.png';
  registerForm!: FormGroup;

  request = new FormData();

  constructor(private authServ: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
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
      
      this.request.append('firstName', this.registerForm.get('firstName')?.value);
      this.request.append('lastName', this.registerForm.get('lastName')?.value);
      this.request.append('email', this.registerForm.get('email')?.value);
      this.request.append('password', this.registerForm.get('password')?.value);
      this.request.append('gender',this.registerForm.get('gender')?.value);

      this.authServ.TraineeRegister(this.request).subscribe(data=>{
        console.log(data);
        
        
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      this.request.append('image',file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file); 
      console.log(reader);
      
    }
  }
  


}
