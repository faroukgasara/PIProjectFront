import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionModel } from '../model/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
    token = localStorage.getItem('token');
	questionUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

   options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  getQuestions(){
  	return this.http.get<QuestionModel[]>(this.questionUrl+"/Question/questions",this.options);
  }

  deleteQuestion(question: QuestionModel | number):Observable<QuestionModel>{
  	const id = typeof question === 'number' ? question : question.id;
  	return this.http.delete<QuestionModel>(this.questionUrl+'/Question/delete-question/'+id,this.options); 
     
  }



}