import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { EventsModel } from '../model/events';
import { EventService } from '../services/events.service';
import { DatePipe } from '@angular/common'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AffectercagreseventComponent } from './affectercagresevent/affectercagresevent.component';
import { UpdateeventComponent } from './updateevent/updateevent.component';



@Component({
  selector: 'app-eventscomponent',
  templateUrl: './eventscomponent.component.html',
  styleUrls: ['./eventscomponent.component.scss'],
  providers: [DatePipe]

})
export class EventscomponentComponent implements OnInit {
  
  form:FormGroup;
  events: EventsModel[];
  eventss: EventsModel;
  titre:any;
  p:number = 1 ;  
  minDate:any = "";

 
  
  constructor(private dialog :MatDialog ,private EventsHttp: EventService, private breakpointObserver: BreakpointObserver, private eventHttp: EventService, private datePipe: DatePipe, private formBuilder:FormBuilder) {}

    ngOnInit(): void {
      
      this.getDate();
      this.getEvents();
      this.form=this.formBuilder.group({

        //id: ['',Validators.required],
        dateEvenement: ['',Validators.required],
        titre: ['',Validators.required],
        lieux: ['',Validators.required],
        affiche: ['',Validators.required],
        description: ['',Validators.required],
        typeEvenement: ['',Validators.required],

      });

   }

   getDate(){
    var date:any = new Date();
    var toDate:any = date.getDate();
    if(toDate < 10)
    [
      toDate = 0 + toDate
    ]
    var month = date.getMonth() + 1;
    if(month < 10){
      month = '0' + month;
    } 
    var year = date.getFullYear();
    this.minDate = year + "-" + month + "-" + toDate
  }

  openModal(event:any): void {
    const dialogRef = this.dialog.open(UpdateeventComponent, {
      width: '80%',
      data: {event},
    });
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

  addEvent(){
  

    this.eventHttp.addEvent(this.form.getRawValue()).pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      console.log("efe")
      this.form.reset();
      this.ngOnInit();
      
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
      console.log(this.form.getRawValue())
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
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  onCreate(eventid) {
    localStorage.setItem('eventid', JSON.stringify(eventid));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "80%";
    this.dialog.open(AffectercagreseventComponent,dialogConfig);
  }


}
