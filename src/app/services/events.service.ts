import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsModel } from '../model/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {
    token = localStorage.getItem('token');
	userUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  getallevents(){
  	return this.http.get<EventsModel[]>(this.userUrl+"/event/getallevents",this.options);
  }

  deleteEvent(event: EventsModel | number):Observable<EventsModel>{
    const id = typeof event === 'number' ? event : event.id;
    return this.http.delete<EventsModel>(this.userUrl+'/event/deleteEvent/'+id,this.options);
}

  addReport(reported: string,reportedby: string,reason: string){
  	return this.http.post(this.userUrl+'/reporting/addReport/'+reported+'/'+reportedby+'/'+reason,null,this.options);
  }



}