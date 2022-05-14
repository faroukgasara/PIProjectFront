import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  displayedColumns: string[] = ['id','text','answers'];
  questions: QuestionModel[];

  constructor(private QuestionHttp: QuestionService) { }

  ngOnInit(): void {
  }

  getQuestions(){
    this.QuestionHttp.getQuestions().subscribe(
  		(data:QuestionModel[]) => {this.questions = data}
  	);

  }

  deleteQuestion(Id: number){
  	this.QuestionHttp.deleteQuestion(Id)
    .toPromise()
    .then((response)=>{
      this.getQuestions();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
    
  }

}
