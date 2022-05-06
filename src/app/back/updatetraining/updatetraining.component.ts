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
    this.id=this.route.snapshot.params['id']
    this.trainingser.getTrainingById(this.id).subscribe( data=>{
     // this.description=this.trainingser.description;
      this.newTraining=data ;
      console.log(data)

    },error=>console.log(error));
  }

  updatetraining(){
    this.trainingser.updateTraining(this.id,this.newTraining).subscribe((data)=>{
      this.router.navigate(['gestionformation']);

    })

  }

 

}
