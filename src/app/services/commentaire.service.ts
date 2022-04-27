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
  
  apiURL: string = 'http://localhost:8089/WomenEmpowerment/commentaire/';

  produits: Commentaire[];
  publica: Commentaire;

 // produit : Produit;

  constructor(private http : HttpClient) {
 
  }
    listeProdt(): Observable<Commentaire[]>{
      let options = {
      
       headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
     };
 
     return this.http.get<Commentaire[]>(this.apiURL,options);
     }
 
 
 
    
    ajouterProdt( prod: Commentaire):Observable<Commentaire>{
     let options = {
       headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
     };
     return this.http.post<Commentaire>(`${this.apiURL}add`, prod, options);
     }
     getPost(id: Number):Observable<Commentaire>{
       let options = {
         headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
       };
       const newLocal = this.http.get<Commentaire>(`${this.apiURL}get/${id}`, options);
       return newLocal;
     }
    
     supprimerPublation(id : number) {
       let options = {
         headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
       };
  
       return  this.http.delete(`${this.apiURL}delete/${id}`,options)
       }
 
     
      consulterPdui(id: number): Observable<Commentaire> {
         const url = `${this.apiURL}/${id}`;
         return this.http.get<Commentaire>(url);
         }
 
 
 updatePduit(prod :Commentaire) : Observable<Commentaire>
 {
 return this.http.put<Commentaire>(this.apiURL, prod, httpOptions);
 }
 
 
 
   
 }