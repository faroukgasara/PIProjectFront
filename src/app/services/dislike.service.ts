import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DislikeService {

  token = localStorage.getItem('token');

  constructor(private http:HttpClient) { }

  addlike(id:number,dislike:any) {
    let user = JSON.parse(localStorage.getItem('user'));
    let options = {
     
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };
    return this.http.post("http://localhost:8089/WomenEmpowerment/dislike/add/"+id+"/"+`${user.email}`,dislike,options);}
}
