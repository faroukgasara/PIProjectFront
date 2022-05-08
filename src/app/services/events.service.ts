import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsModel } from '../model/events';

@Injectable({
  providedIn: 'root'
  
})
export class EventService {
    token = localStorage.getItem('token');
	eventUrl:string = 'http://localhost:8089/WomenEmpowerment';

  constructor(private http:HttpClient) { }

  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };

  getallevents(){
  	return this.http.get<EventsModel[]>(this.eventUrl+"/event/getallevents",this.options);
  }

  deleteEvent(event: EventsModel | number):Observable<EventsModel>{
    const id = typeof event === 'number' ? event : event.id;
    return this.http.delete<EventsModel>(this.eventUrl+'/event/deleteEvent/'+id,this.options);
}



  addEvent(event:EventsModel){
    return this.http.post(this.eventUrl+"/event/addeventonly",event,this.options);
  }


  effectuerevent(idevent: any,idres: number,idcag: number){
  	return this.http.post(this.eventUrl+'/event/addeventon/'+idevent+'/'+idres+'/'+idcag,null,this.options);
  }

}