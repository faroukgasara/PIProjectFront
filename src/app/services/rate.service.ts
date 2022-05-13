import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateService {


  token = localStorage.getItem('token');

  constructor(private http:HttpClient) { }

  addRate(id:number,Rate:any) {
    let user = JSON.parse(localStorage.getItem('user'));
    let options = {
     
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };
    return this.http.post("http://localhost:8089/WomenEmpowerment/rating/add/"+id+"/"+`${user.email}`,Rate,options);}
}
