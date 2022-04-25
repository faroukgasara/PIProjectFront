import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingModel } from '../model/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
    token = localStorage.getItem('token');
	trainingsUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

   options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  getTrainings(){
  	return this.http.get<TrainingModel[]>(this.trainingsUrl+"/Training/retrieve-all-Training",this.options);
  }

 



}