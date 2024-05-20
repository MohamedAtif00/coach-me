import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/service/auth.service';
import { PlanService } from 'src/app/shared/service/plan.service';
import { Plan } from '../add-plan/add-plan.component';
import { PlanModel } from 'src/app/model/plan.model';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit,AfterViewInit{

  plans!:PlanModel[];


  constructor(private planServ:PlanService,private authServ:AuthService){}

  ngOnInit(): void {
    

  }

  ngAfterViewInit(): void {
    this.GetPlans()
  }

  GetPlans()
  {
    this.authServ.allowAccessToken().subscribe(data=>{
      this.authServ.user$.subscribe(data=>{
        console.log('user plan',data);
        
        if(data)
          {
            this.planServ.GetPlansByTrainer(data?.id).subscribe(plan=>{
      
              if(plan.value)
                console.log('Plans',plan);
                this.plans = plan.value
      
            })
  
          }
      })

    })

  }



}
