import { Component, OnInit,ViewChild } from '@angular/core';
import { TrainingModel } from 'src/app/model/training';
import { TrainingService } from 'src/app/services/training.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-trainingsback',
  templateUrl: './trainingsback.component.html',
  styleUrls: ['./trainingsback.component.scss']
})
export class TrainingsbackComponent implements OnInit {
  trainings: TrainingModel[];
  trainingList: any
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private TrainingHttp: TrainingService,private router:Router) { }

  ngOnInit(): void {
    this.getTrainings()
  }
  getTrainings(){
    this.TrainingHttp.getTrainings().subscribe(
  		(data:TrainingModel[]) => {this.trainings = data;console.log(this.trainings)}
  	);
  }

  deleteTraining(id: number){
  	this.TrainingHttp.deleteTraining(id)
    .toPromise()
    .then((response)=>{
      this.ngOnInit();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });
  }
  updatetrainings(id:number)
  {
    let user=JSON.parse(localStorage.getItem('user'));
  console.log(localStorage.getItem('user'))

    console.log(id);
    this.router.navigate(['updatetrainings',user.email,id]);
  }

  SearchTraining(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.trainings) {
      if (s.title.toLowerCase().indexOf(key.toLowerCase()) !== -1) 
      {
        results.push(s);
      }
    }
    this.trainings = results;
    console.log(this.trainings);

    
    if ( !key) {
      this.getTrainings()
    }
  }

}
