import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { Options } from 'selenium-webdriver';
@Injectable({
  providedIn: 'root'
})
export class LikeService {
  
  token = localStorage.getItem('token');

  constructor(private http:HttpClient) { }

  addlike(id:number,Likes:any) {
    let user = JSON.parse(localStorage.getItem('user'));
    let options = {
     
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };
    return this.http.post("http://localhost:8089/WomenEmpowerment/likes/add/"+id+"/"+`${user.email}`,Likes,options);}
}
 