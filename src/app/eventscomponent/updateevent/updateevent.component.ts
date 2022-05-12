import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-updateevent',
  templateUrl: './updateevent.component.html',
  styleUrls: ['./updateevent.component.scss'],
  providers: [DatePipe]
})
export class UpdateeventComponent implements OnInit { form:FormGroup;
  minDate:any = "";

  constructor(private dialog :MatDialog, public dialogRef: MatDialogRef<UpdateeventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
private eventHttp: EventService, private datePipe: DatePipe, private formBuilder:FormBuilder) {}


  ngOnInit(): void {
    this.getDate();
    this.form=this.formBuilder.group({

      id: [this.data.event.id,Validators.required],
      dateEvenement: ['',Validators.required],
      titre: [this.data.event.titre,Validators.required],
      lieux: [this.data.event.lieux,Validators.required],
      affiche: ['',Validators.required],
      description: [this.data.event.description,Validators.required],
      typeEvenement: [this.data.event.typeEvenement,Validators.required],

    });
  }
  update(){
    this.eventHttp.update(this.form.getRawValue())
    .toPromise()
    .then((response)=>{
      window.location.reload();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
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

}
