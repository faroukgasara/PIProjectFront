import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { EventsModel } from '../model/events';
import { EventService } from '../services/events.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-eventscomponent',
  templateUrl: './eventscomponent.component.html',
  styleUrls: ['./eventscomponent.component.scss']
})
export class EventscomponentComponent implements OnInit {


  events: EventsModel[];
  titre:any;
  p:number = 1 ;
  constructor(
    private EventsHttp: EventService) {}

    ngOnInit(): void {
      this.getEvents();
   }

   getEvents(){
    this.EventsHttp.getallevents().subscribe(
  		(data:EventsModel[]) => {this.events = data;console.log(this.events)}
  	);
  }

  deleteEvent(id: number){
  	this.EventsHttp.deleteEvent(id)
    .toPromise()
    .then((response)=>{
      this.getEvents();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });
  }

  Search(){
    if(this.titre==""){
      this.ngOnInit();
    } else {
      this.events = this.events.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.titre.toLocaleLowerCase());
      })
    }
  }
  key:string='id';
  reverse:boolean = false;
  Sort(key){
    this.key = key
    this.reverse = !this.reverse;

  }
}

