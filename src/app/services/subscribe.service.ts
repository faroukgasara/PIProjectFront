import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
    user = JSON.parse(localStorage.getItem('user'));
    token = localStorage.getItem('token');
    subUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  addSubscriber(){
  	return this.http.post(this.subUrl+"/subscriber/addSubscriber/"+this.user.email, null,this.options);
  }


  genrateAndDownloadQRCode(){
    return this.http.get(this.subUrl+"/genrateAndDownloadQRCode/"+this.user.email,this.options);
}




}