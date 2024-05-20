import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/authentication/model/user.model';
import { AuthService } from 'src/app/authentication/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  authUser!:UserModel;
  constructor(public authServ:AuthService){}

  ngOnInit(): void {
      //console.log(this.authServ.user$);
      this.authServ.user$.subscribe(data=>{
        console.log(data);
        if(data)
        this.authUser  = data
        console.log(this.authUser.username);
        
      })
      
  }

  

}
