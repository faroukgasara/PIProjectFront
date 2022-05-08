import { BreakpointObserver ,Breakpoints} from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CagnotteModel } from 'src/app/model/cagnotte';
import { CqgnotteService } from 'src/app/services/cagnotte.service';
import { EventService } from 'src/app/services/events.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-cagnottecomponent',
  templateUrl: './cagnottecomponent.component.html',
  styleUrls: ['./cagnottecomponent.component.scss'],
  providers: [DatePipe]
})
export class CagnottecomponentComponent implements OnInit {

  form:FormGroup;
  cagnotte: CagnotteModel[];
  valeur:any;
  p:number = 1 ;
  constructor( private cagnotteHttp: CqgnotteService, private breakpointObserver: BreakpointObserver, private eventHttp: EventService, private datePipe: DatePipe, private formBuilder:FormBuilder) {}


  ngOnInit(): void {
    this.getcagnotte()
    this.form=this.formBuilder.group({
     
      dateDebut: ['',Validators.required],
      dateFin: ['',Validators.required]


    });
  }
  getcagnotte(){
    this.cagnotteHttp.getcagnotte().subscribe(
      (data:CagnotteModel[])=>{this.cagnotte=data;console.log(this.cagnotte)}
    )
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

  addCagnotte(){

    this.cagnotteHttp.addCagnotte(this.form.getRawValue()).pipe(map((data)=>data))
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

  deleteCagnotte(id: number){
  	this.cagnotteHttp.deleteCagnotte(id)
    .toPromise()
    .then((response)=>{
      this.getcagnotte();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });
  }

 

}
