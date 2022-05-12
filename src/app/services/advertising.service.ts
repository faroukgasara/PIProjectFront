import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advertising } from '../model/advertising';

@Injectable({
  providedIn: 'root'
})
export class AdvertisingService {

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

  getAdvertising(){
    return this.http.get<Advertising[]>(this.Url+"/Publicite/getAll",this.options);
  }

  deleteAdvertising(advertising: Advertising | number):Observable<Advertising>{
  	const id = typeof advertising === 'number' ? advertising : advertising.id;
  	return this.http.delete<Advertising>(this.Url+'/user/deleteUser/'+id,this.options);
  }


}
