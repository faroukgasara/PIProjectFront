import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  

  constructor(private TrainingHttp: TrainingService) { }

  ngOnInit(): void {
    this.TrainingHttp.getTrainings().subscribe(
  		(data:TrainingModel[]) => {this.trainings = data;console.log(this.trainings)}
  	);
  }

  getTrainings(){
    

  }
}
