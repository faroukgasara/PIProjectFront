import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsModel } from '../model/events';
import { CagnotteModel } from '../model/cagnotte';

@Injectable({
  providedIn: 'root'
  
})
export class CqgnotteService {
    token = localStorage.getItem('token');
	eventUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  getcagnotte(){
  	return this.http.get<CagnotteModel[]>(this.eventUrl+"/cagnotte/getcagnotte",this.options);
  }

  addCagnotte(cagnotte: CagnotteModel){
    return this.http.post(this.eventUrl+'/cagnotte/addcagnotte',cagnotte,this.options);
}
deleteCagnotte(cag: CagnotteModel | number):Observable<EventsModel>{
    const id = typeof cag === 'number' ? cag : cag.id;
    return this.http.delete<EventsModel>(this.eventUrl+'/cagnotte/deleteCagnotte/'+id,this.options);
}



}