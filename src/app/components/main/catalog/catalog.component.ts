import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TrainerService } from 'src/app/shared/service/trainer.service';

export interface Trainer{
  id:{value:string},
  about:string,
  image:string,
  username:string
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

  trainers!:Trainer[];

  constructor(private trainerServ:TrainerService,private sanitizer:DomSanitizer){}

  ngOnInit(): void {
    this.trainerServ.GetAllTrainer().subscribe(data=>{
      console.log(data);
      this.trainers = data.value
    })
  }



  base64ToUrl(base64: string): SafeUrl {
    // Prefix the base64 string with the appropriate data URI scheme
    const base64Url = `data:image/jpeg;base64,${base64}`;

    // Use DomSanitizer to bypass security and trust this URL
    return this.sanitizer.bypassSecurityTrustUrl(base64Url);
  }


  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     this.imageaSelected = file
  //     reader.onload = () => {
  //       this.imageSrc = reader.result as string;
  //     };
  //     reader.readAsDataURL(file); 
  //     console.log(reader);
      
  //   }
  // }


}
