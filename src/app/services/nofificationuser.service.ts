import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationuserService {
    user = JSON.parse(localStorage.getItem('user'));
    token = localStorage.getItem('token');
    subUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  addNotif(email:string,content:string){
  	return this.http.post(this.subUrl+"/notificationuser/addNotificationuser/"+content+"/"+email, null,this.options);
  }


  addGlobal(content:string){
  	return this.http.post(this.subUrl+"/notificationuser/addGlobalnotificationuser/"+content, null,this.options);
  }


}