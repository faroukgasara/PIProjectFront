import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CqgnotteService } from 'src/app/services/cagnotte.service';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-affectercagresevent',
  templateUrl: './affectercagresevent.component.html',
  styleUrls: ['./affectercagresevent.component.scss']
})
export class AffectercagreseventComponent implements OnInit {
  form:FormGroup;
  cag:any=[]
  res:any=[]
  constructor(private formBuilder:FormBuilder,private EventsHttp: EventService,private cagHttp: CqgnotteService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      res: ['',Validators.required],
      cag: ['',Validators.required],
    });


    this.cagHttp.getcagnotte().subscribe(
  		(data) => {this.cag = data;console.log(this.cag)}
  	);

    this.cagHttp.getReas().subscribe(
  		(data) => {this.res = data;console.log(this.res)}
  	);
  }

  affecter(){
    
    this.EventsHttp.effectuerevent(localStorage.getItem('eventid'),this.form.controls['res'].value,this.form.controls['cag'].value).subscribe();
    window.location.reload()

  }

}
