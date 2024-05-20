import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { development } from "src/environment";
import { GeneralResponse } from "../general.response";

@Injectable({
    providedIn:'root'
})
export class TrainerService
{

    private getAllTrainres:string = `${development.localhost}Trainer`

    constructor(private http:HttpClient){}

    GetAllTrainer()
    {
        return this.http.get<GeneralResponse<any>>(this.getAllTrainres)
    }



}