import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { development } from "src/environment";
import { GeneralResponse } from "../general.response";
import { UserModel } from "src/app/authentication/model/user.model";
import { Chat } from "src/app/model/chat.model";

export interface user{
    firstName:string,
    gender:string,
    id:{value:string},
    image:string,
    secondName:string,
    trainerId:string | null
}


@Injectable({
    providedIn:'root'
})
export class ChatService 
{

    users!:user[];

    private getAllMessagesWithTrainer:string = `${development.localhost}Chat/GetAllMessagesForTrainer/`
    private getAllMessagesWithTrainee:string = `${development.localhost}Chat/GetAllMessagesForTrainee/`
    private getAllMessagesBetweenTrainerAndTrainee : string = `${development.localhost}Chat/GetAllMessagesBetweenTrainerAndTrainee`
    private postMessage :string = `${development.localhost}Chat`

    constructor(private http:HttpClient){}

    GetAllMessageWithTrainer(id:string)
    {
        return this.http.get<GeneralResponse<user[]>>(this.getAllMessagesWithTrainer+id);
    }

    GetAllMessageWithTrainee(id:string)
    {
        return this.http.get<GeneralResponse<user[]>>(this.getAllMessagesWithTrainee+id);
    }

    GetAllMessagesBetweenTrainerAndTrainee(userId:string,trainerId:string)
    {
        return this.http.post<GeneralResponse<Chat[]>>(this.getAllMessagesBetweenTrainerAndTrainee,{sendId:trainerId,receiverId:userId});
    }

    SendMessage(sender:string,receiver:string,message:string)
    {
        return this.http.post<GeneralResponse<any>>(this.postMessage,{sender:sender,receiver:receiver,message:message});
    }
    
    
    

}