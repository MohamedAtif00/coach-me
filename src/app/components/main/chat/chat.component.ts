import { Component, OnInit } from '@angular/core';
import { AllowAccessResponse } from 'src/app/authentication/model/Response/allow-access.response';
import { UserModel } from 'src/app/authentication/model/user.model';
import { AuthService } from 'src/app/authentication/service/auth.service';
import { Chat } from 'src/app/model/chat.model';
import { ChatService, user } from 'src/app/shared/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  mainUser!:AllowAccessResponse;
  chats!:Chat[];
  selectedUser!:user;
  users!:user[];

  constructor(private chatServ:ChatService,private authServ:AuthService){}

  ngOnInit(): void {
    this.authServ.allowAccessToken().subscribe(data=>{
      console.log('User ',data?.userId);
      if(data && data.role == 'Trainer')
        {
          this.mainUser = data

          this.chatServ.GetAllMessageWithTrainer(data?.userId).subscribe(chat=>{
            console.log('chat',chat);
            if(chat.value)
              {

                this.users = chat.value
                console.log('users',this.users);
                
              }
          })

        }else if(data)
        {
          
          this.mainUser = data

          this.chatServ.GetAllMessageWithTrainee(data?.userId).subscribe(chat=>{
            console.log('chat',chat);
            if(chat.value)
              {

                this.users = chat.value
                console.log('users',this.users);
                
              }
          })

        }
    })
  }



  ChatDisplay(user:user)
  {
    this.selectedUser = user;
    this.authServ.allowAccessToken().subscribe(data=>{

      if(data && data.role == 'Trainer'){

        this.chatServ.GetAllMessagesBetweenTrainerAndTrainee(user.id.value,data.userId).subscribe(response=>{
          console.log(response);
          if(response.value)
          this.chats = this.sortMessagesByDate(response.value)


          console.log('chats',this.chats);
          
        })

      }else if(data && data.role == 'Trainee')
      {
        
        this.chatServ.GetAllMessagesBetweenTrainerAndTrainee(user.id.value,data.userId).subscribe(response=>{
          console.log(response);
          if(response.value)
          this.chats = this.sortMessagesByDate(response.value)


          console.log('chats',this.chats);
          
        })

      }



    })

  }



  send(value:string)
  {
    this.chatServ.SendMessage(this.mainUser.userId,this.selectedUser.id.value,value).subscribe(data=>{
      console.log(data);
      this.ChatDisplay(this.selectedUser);
    });
  }

  sortMessagesByDate(messages: Chat[]): Chat[] {
    return messages.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateA - dateB;
    });
  }




  base64ToImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
  

}
