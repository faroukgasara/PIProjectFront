import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class PredictionEmotion {
    user = JSON.parse(localStorage.getItem('user'));
    token = localStorage.getItem('token');
    subUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  getData(email:any){
    return this.http.get(this.subUrl+"/face/data/"+email,this.options);
  }

  getEmotions(email:any){
    return this.http.get(this.subUrl+"/user/UserPrediction/"+email,this.options);
    }

    




}