import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/service/auth.service';
import { PlanService } from 'src/app/shared/service/plan.service';

export interface Plan {
  trainerId: string;
  name:string;
  duration: number;
  focus: string;
  sessions: number;
  price: number;
}



@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent {

  planForm: FormGroup;

  constructor(private fb: FormBuilder, private planService: PlanService,private authServ:AuthService) {
    this.planForm = this.fb.group({
      name:['',Validators.required],
      duration: [0, Validators.required],
      focus: ['', Validators.required],
      sessions: [0, Validators.required],
      price: [0, Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    debugger
    if (this.planForm.valid) {
      this.authServ.user$.subscribe(data=>{
        if(data){
          const newPlan: Plan = {
            trainerId: data?.id, // id will be set by the backend
            name:this.planForm.value.name,
            duration: this.planForm.value.duration,
            focus: this.planForm.value.focus,
            sessions: this.planForm.value.sessions,
            price: this.planForm.value.price
          };

          this.planService.AddPlan(newPlan).subscribe(
            response => {
              console.log('Plan created successfully', response);
              this.planForm.reset();
            },
            error => {
              console.error('Error creating plan', error);
            }
          );



        }

      })

    }
  }


}
