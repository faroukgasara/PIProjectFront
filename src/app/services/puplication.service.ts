import { Injectable } from '@angular/core';
import { publication } from '../model/publication.model';
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


export class publicationService {

  token = localStorage.getItem('token');
  
  apiURL: string = 'http://localhost:8089/WomenEmpowerment/publication/';

  produits: publication[];
  publica: publication;

 // produit : Produit;

  constructor(private http : HttpClient) {
 
   }
 
  
   listeProduit(): Observable<publication[]>{
     let options = {
     
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };

    return this.http.get<publication[]>(this.apiURL,options);
    }



   
   ajouterProduit( prod: publication):Observable<publication>{
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };
    return this.http.post<publication>(`${this.apiURL}add`, prod, options);
    }
    getPost(id: Number):Observable<publication>{
      let options = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      };
      const newLocal = this.http.get<publication>(`${this.apiURL}get/${id}`, options);
      return newLocal;
    }
   
    supprimerPublication(id : number) {
      let options = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      };
 
      return  this.http.delete(`${this.apiURL}delete/${id}`,options)
      }

    
     consulterProdui(id: number): Observable<publication> {
        const url = `${this.apiURL}/${id}`;
        return this.http.get<publication>(url);
        }


updateProduit(prod :publication) : Observable<publication>
{
return this.http.put<publication>(this.apiURL, prod, httpOptions);
}



  
}
