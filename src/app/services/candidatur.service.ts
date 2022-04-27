import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidaturModel } from '../model/candidatur';

@Injectable({
  providedIn: 'root'
})
export class CandidaturService {
    token = localStorage.getItem('token');
	candidaturUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

   options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
 /* getcandidaturs(){
  	return this.http.get<CandidaturModel[]>(this.candidaturUrl+"/Candidatur/candidaturs",this.options);
  }*/

  /*deleteCandidatur(candidatur: CandidaturModel | number):Observable<CandidaturModel>{
  	const idCandidature = typeof candidatur === 'number' ? candidatur: candidatur.idCandidature;
  	return this.http.delete<CandidaturModel>(this.candidaturUrl+'/Candidatur/delete-candidatur/'+idCandidature,this.options);
  }*/
}