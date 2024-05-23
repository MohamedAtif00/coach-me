import { Injectable } from "@angular/core";

import { GetReservationModel, ReservationModel } from "src/app/model/reservation.model";
import { development } from "src/environment";
import { GeneralResponse } from "../general.response";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class ReservationService{

    private addReservation:string = `${development.localhost}Reservation`

    constructor(private http:HttpClient){}

    AddReservation(request:ReservationModel)
    {
        // return this.http.post<GeneralResponse<any>>(this.addReservation,request);

        return this.http.post<GeneralResponse<any>>(this.addReservation,request)
    }

}