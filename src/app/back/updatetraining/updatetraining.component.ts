import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingModel } from 'src/app/model/training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-updatetraining',
  templateUrl: './updatetraining.component.html',
  styleUrls: ['./updatetraining.component.scss']
})
export class UpdatetrainingComponent implements OnInit {
  id:number;
  description:string;
  newTraining:TrainingModel=new TrainingModel();
  constructor(private trainingser:TrainingService,private route:ActivatedRoute ,private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['idFormation']
    this.trainingser.getTrainingById(this.id).subscribe( data=>{
     // this.description=this.trainingser.description;
    
    
      this.newTraining=data ;
      console.log( data);
     
      console.log(this.id);
     

    },error=>console.log(error));
  }

  tester(x: any){
    console.log('tester');
    console.log("*************"+x);
  }


  updatetraining(){
    console.log(this.id);
    this.trainingser.updateTraining(this.newTraining).subscribe((data)=>{
      this.router.navigate(['gestionformation']);

    })

  }

 

}
