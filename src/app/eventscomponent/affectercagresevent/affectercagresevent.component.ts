import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-affectercagresevent',
  templateUrl: './affectercagresevent.component.html',
  styleUrls: ['./affectercagresevent.component.scss']
})
export class AffectercagreseventComponent implements OnInit {
  form:FormGroup;
  constructor(private formBuilder:FormBuilder,private EventsHttp: EventService) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      res: ['',Validators.required],
      cag: ['',Validators.required],
    });
  }

  affecter(){
    let res = this.form.get['res'].value;
    let cag=this.form.get['cag'].value;
    this.EventsHttp.effectuerevent(localStorage.getItem('eventid'),res,cag).subscribe();

  }

}
