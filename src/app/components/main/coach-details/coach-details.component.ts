import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from 'src/app/shared/service/plan.service';
import { Plan } from '../add-plan/add-plan.component';
import { PlanModel } from 'src/app/model/plan.model';
import { ReservationService } from 'src/app/shared/service/reservation.service';
import { ReservationModel } from 'src/app/model/reservation.model';
import { AuthService } from 'src/app/authentication/service/auth.service';

@Component({
  selector: 'app-coach-details',
  templateUrl: './coach-details.component.html',
  styleUrls: ['./coach-details.component.css']
})
export class CoachDetailsComponent implements OnInit{


  trainerId!:string;
  plans!:PlanModel[] ;
  constructor(private planServ:PlanService,
              private route:ActivatedRoute,
              private router:Router,
              private reservationServ:ReservationService,
              private authServ:AuthService){}

  ngOnInit(): void {
    this.trainerId = this.route.snapshot.params['id']

    this.planServ.GetPlansByTrainer(this.trainerId).subscribe(data=>{
      console.log(data);

      if(data.value)
        {
          this.plans = data.value;
        }else
        {
          alert('Data Error')
        }
      
    })
  }


  AddReservation(item:PlanModel)
  {
    let request:ReservationModel;
    this.authServ.allowAccessToken().subscribe(data=>{
      if(data)
        {

            request = {trainee:data.userId,trainerId:this.trainerId,planId:item.id.value} 
          
            this.reservationServ.AddReservation(request).subscribe(data=>{
              if(data.isSuccess)
                {
                  console.log(data);
                  //alert('reservation has been created')
                  this.router.navigate(['chat'])
  
                }

           })


        }


    })
  }

}
