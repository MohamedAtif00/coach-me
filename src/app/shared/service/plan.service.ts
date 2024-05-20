import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { development } from "src/environment";
import { GeneralResponse } from "../general.response";
import { AuthService } from "src/app/authentication/service/auth.service";
import { Plan } from "src/app/components/main/add-plan/add-plan.component";
import { PlanModel } from "src/app/model/plan.model";


@Injectable({
    providedIn:'root'
})
export class PlanService{


    private addPlan:string = `${development.localhost}plan`
    private getPlanByTrainer = `${development.localhost}Plan/GetAllPlanForTrainer/`


    constructor(private http:HttpClient){}

    AddPlan(request:any)
    {
        return this.http.post<GeneralResponse<PlanModel[]>>(this.addPlan,request);
    }

    GetPlansByTrainer(userId:string)
    {

        return this.http.get<GeneralResponse<any>>(this.getPlanByTrainer+userId);


        
    }

}