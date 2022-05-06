import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingModel } from '../../model/training';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'dateDebut', 'dateFin', 'nbrMaxApprenant', 'affiche','formateur'];
  trainings: TrainingModel[];
  

  constructor(private TrainingHttp: TrainingService,private router:Router) { }

  ngOnInit(): void {
    this.TrainingHttp.getTrainings().subscribe(
  		(data:TrainingModel[]) => {this.trainings = data;console.log(this.trainings)}
  	);
  }

  getTrainings(){
    

  }
  deleteTraining(id: number){
  	this.TrainingHttp.deleteTraining(id)
    .toPromise()
    .then((response)=>{
      this.ngOnInit();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });
  }

  detailTrainings(idFormation:number)
  {
    this.router.navigate(['trainings',idFormation]);
  }
  applyFilter(filterValue:string )
  {
    // this.dataso
  }

  // jaimetraining(t:TrainingModel)
  // {
    
    
  //     let i=this.trainings.indexOf(t);
  //     this.trainings[i].like++;
    
  // }

}
