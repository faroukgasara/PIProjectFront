import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizModel } from '../model/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
    token = localStorage.getItem('token');
	quizUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

   options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  getQuizs(){
  	return this.http.get<QuizModel[]>(this.quizUrl+"/Quiz/quizs",this.options);
  }

  deleteQuiz(quiz: QuizModel | number):Observable<QuizModel>{
  	const idQuiz = typeof quiz === 'number' ? quiz : quiz.idQuiz;
  	return this.http.delete<QuizModel>(this.quizUrl+'/Quiz/delete-quiz/'+idQuiz,this.options);
  }



}