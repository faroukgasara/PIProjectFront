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


  getAllQuestions(){
    this.questionService.getQuestioJson()
    .subscribe(res=>{ this.questionList = res.questions;
    })

  }

  nextQuestion(){
    this.currentquestion++;
    
  }
 previousQuestion(){
   this.currentquestion--;
   
 }

 answer(currentquestionNumber: number, option:any){

  if(currentquestionNumber=== this.questionList.length){
    this.isQuizCompleted= true;
    this.stopCounter();
  }

  if(option.correct){
    this.points+=10;//this.points = this.points +10;
    this.correctAnswer++;
    setTimeout(()=>{
      this.currentquestion++;
      this.resetCounter();
      this.getProgressPercent();
    }, 100);
    
  }
    else{
     
      setTimeout(()=>{
        this.currentquestion++;
        this.incorrectAnswer++;
        this.resetCounter(); 
        this.getProgressPercent();
      }, 100);
    
      this.points-=10;
    }
 }
 startCounter(){
   this.interval$ = interval(1000)
   .subscribe(val=>{
     this.counter--;
     if(this.counter===0){
       this.currentquestion++;
       this.counter=60;
       this.points-=10;
     }
   });
   setTimeout(() => {
     this.interval$.unsubscribe();
   },6000000);
 }

 stopCounter(){
  this.interval$.unsubscribe();
  this.counter=0;

 }
 resetCounter(){
  this.stopCounter();
  this.counter=60;
  this.startCounter();
 }

 resetQuiz(){
   this.resetCounter();
   this.getAllQuestions();
   this.points=0;
   this.counter=60;
   this.currentquestion=0; 
   this.progress="0";

 }

 getProgressPercent(){
  this.progress = ((this.currentquestion/this.questionList.length)*100).toString();
  return this.progress;
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
