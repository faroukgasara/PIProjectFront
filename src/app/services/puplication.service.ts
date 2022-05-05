import { Injectable } from '@angular/core';
import { publication } from '../model/publication.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Options } from 'selenium-webdriver';
import { Commentaire } from '../model/commentaire.model';

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
  apiURL1: string = 'http://localhost:8089/WomenEmpowerment/commentaire/';
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



   
   ajouterProduit( prod: any,userfile:any):Observable<publication>{
       const formData = new FormData();
    formData.append('file',userfile)
    formData.append('body',JSON.stringify(prod))
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };
    let user = JSON.parse(localStorage.getItem('user'));
  
    return this.http.post<publication>(`${this.apiURL}add/${user.email}`, formData, options);
    }
    
    getPost(id: Number):Observable<publication>{
      let options = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      };
      return this.http.get<publication>(`${this.apiURL}get/${id}`,options);
    
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

addCommentaire( id:number ,prod: Commentaire){
  let options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };    let user = JSON.parse(localStorage.getItem('user'));
  return this.http.post("http://localhost:8089/WomenEmpowerment/likes/add/"+id+"/"+`${user.email}`, prod, options);
  }

  
}
