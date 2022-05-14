import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CqgnotteService } from 'src/app/services/cagnotte.service';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [DatePipe]
})
export class ReservationComponent implements OnInit {
  form:FormGroup;
  events:any={};
  p:number = 1 ;  
  minDate:any = "";
  constructor(private dialog :MatDialog ,private cagHttp: CqgnotteService, private breakpointObserver: BreakpointObserver, private eventHttp: EventService, private datePipe: DatePipe, private formBuilder:FormBuilder) {}

  ngOnInit() {

    this.getDate();
    this.form=this.formBuilder.group({
      lieuxReservation: ['',Validators.required],
      dateReservation: ['',Validators.required],
      maxParticipants: ['',Validators.required],
    });

    this.cagHttp.getReas().subscribe(
  		(data) => {this.events = data;console.log(this.events)}
  	);
  }

  key:string='id';
  reverse:boolean = false;
  Sort(key){
    this.key = key
    this.reverse = !this.reverse;

  }
  add(){  
    console.log(this.form.getRawValue())
    this.cagHttp.addRes(this.form.getRawValue()).subscribe(
      
      
  	);
    window.location.reload();
    
    
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

}
