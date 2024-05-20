import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/shared/service/trainer.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

  constructor(private trainerServ:TrainerService){}

  ngOnInit(): void {
    this.trainerServ.GetAllTrainer().subscribe(data=>{
      console.log(data);
      
    })
  }



}
