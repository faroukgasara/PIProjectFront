import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplyComplaint } from '../model/reply-complaint';

@Injectable({
  providedIn: 'root'
})
export class ReplycomplaintService {

  token = localStorage.getItem('token');
	Url:string = 'http://localhost:8080/WomenEmpowerment';

  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
  options1 = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    responseType: 'text' as 'text' 
  };
  getSuggestion(){
    return this.http.get<ReplyComplaint[]>(this.Url+"/Reclamation/suggestions/"+localStorage.getItem('update'),this.options);
  }
}
