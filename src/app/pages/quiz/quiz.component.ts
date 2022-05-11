import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Type , ViewChild, ElementRef } from '@angular/core';
import { QuizModel } from 'src/app/model/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  displayedColumns: string[] = ['idQuiz','contenu','name'];
  quizs: QuizModel[];
  @ViewChild('name') namekey: ElementRef;
 //enum TypeQuiz  {QuizTrainer,QuizPlanification,QuizCertif}
 //state: Type = TypeQuiz.init;

  constructor(private QuizHttp: QuizService) { }

  ngOnInit(): void {
  }

  StartQuiz(){
    localStorage.setItem("name", this.namekey.nativeElement.value);
  }




  getQuizs(){
    this.QuizHttp.getQuizs().subscribe(
  		(data:QuizModel[]) => {this.quizs = data}
  	);

  }

  deleteQuiz(IdQuiz: number){
  	this.QuizHttp.deleteQuiz(IdQuiz)
    .toPromise()
    .then((response)=>{
      this.getQuizs();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
    
  }
}
