import { Injectable } from '@angular/core';
import { Commentaire } from '../model/commentaire.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Options } from 'selenium-webdriver';

const httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': 'Bearer ${this.token}'
  }),
 withCredentials: true
};

@Injectable({
  providedIn: 'root'
})


export class CommentaireService {

  token = localStorage.getItem('token');
	aoiUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
 
  getUsers(){
  	return this.http.get<Commentaire[]>(this.aoiUrl+"/commentaire/",this.options);
  }
   
  getComm(id :number){
  	return this.http.get<Commentaire[]>(`${this.aoiUrl}/commentaire/get/${id}`,this.options);
  }
  supprimerPublication(id : number) {
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };

    return  this.http.delete(`${this.aoiUrl}/commentaire/delete/${id}`,options)
    }

  
}