import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Advertising } from 'src/app/model/advertising';
import { Targetedgroups } from 'src/app/model/targetedgroups';
import { AdvertisingService } from 'src/app/services/advertising.service';
import { TargetedgroupsComponent } from 'src/app/targetedgroups/targetedgroups.component';
import { ReplyComplaintComponent } from '../reply-complaint/reply-complaint.component';
declare const annyang: any;

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
  
})
export class AdvertisingComponent implements OnInit{
  displayedColumns: string[] = ['title', 'description', 'dateDebut', 'dateFin', 'nbrMaxApprenant', 'affiche','formateur'];
  advertisings: Advertising[];
  myAngularQrCode:any;
  trainings1: Advertising[];
  populationCible:Targetedgroups[];
  form!: FormGroup;
show: boolean;
  constructor(private  AdHttp: AdvertisingService,private router:Router,private ngZone: NgZone,private formBuilder: FormBuilder,

    private dialog :MatDialog ) {

   // this.myAngularQrCode="";
  }
  voiceActiveSectionDisabled: boolean = true;
  voiceActiveSectionError: boolean = false;
  voiceActiveSectionSuccess: boolean = false;
  voiceActiveSectionListening: boolean = false;
  voiceText: any;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text:new FormControl('',Validators.required),

    });
    this.AdHttp.getAdvertising().subscribe(
      (data:Advertising[]) => {
        this.advertisings = data;
        let n = data.length;

        console.log(this.advertisings)}
    );
  }

  getTrainings(){
    this.AdHttp.getAdvertising().subscribe(
      (data:Advertising[]) => { this.advertisings = data;
    
        let n = data.length;
        for(let i=0;i<=this.advertisings.length;i++){
          //this.advertisings[i].affiche = '../../assets/img/'+this.advertisings[i].affiche.substring(12,this.trainings[i].affiche.length);

      };

        console.log(this.advertisings)});
  }
  deleteTraining(id: number){
    /*this.TrainingHttp.deleteTraining(id)
    .toPromise()
    .then((response)=>{
      this.ngOnInit();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });*/
  }
shown(){
  this.show= !this.show;
}
targeted(ads) {
  localStorage.setItem('vaze', JSON.stringify(ads));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.minWidth = "60%";
  this.dialog.open(TargetedgroupsComponent,dialogConfig);
  this.show= !this.show;
 
}


  applyFilter(filterValue:string )
  {
    // this.dataso
  }

  // jaimetraining(t:TrainingModel)
  // {

  //     let i=this.trainings.indexOf(t);
  //     this.trainings[i].like++;

  // }

  SearchTraining(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const s of this.advertisings) {
      if (s.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(s);
      }
    }
    this.advertisings = results;
    console.log(this.advertisings);

    if ( !key) {
      this.getTrainings()
    }
  }

  image: any;
  initializeVoiceRecognitionCallback(): void {
    annyang.addCallback('error', (err: any) => {
      if (err.error === 'network') {
        this.voiceText = 'Internet is require';
        annyang.abort();
        this.ngZone.run(() => (this.voiceActiveSectionSuccess = true));
      } else if (this.voiceText === undefined) {
        this.ngZone.run(() => (this.voiceActiveSectionError = true));
        annyang.abort();
      }
    });

    annyang.addCallback('soundstart', (res: any) => {
      this.ngZone.run(() => (this.voiceActiveSectionListening = true));
    });

    annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => (this.voiceActiveSectionError = true));
        annyang.abort();
      }
    });

    annyang.addCallback('result', (userSaid: any) => {
      this.ngZone.run(() => (this.voiceActiveSectionError = false));
      let queryText: any = userSaid[0];
      annyang.abort();
      this.voiceText = queryText;
      console.log(queryText);
      // route to the given Voice
      this.router.navigateByUrl('loujein' + this.voiceText);
      console.log (this.voiceText)
      this.ngZone.run(() => (this.voiceActiveSectionListening = false));
      this.ngZone.run(() => (this.voiceActiveSectionSuccess = true));
    });
  }

  startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

    if (annyang) {
      let commands = {
        'demo-annyang': () => {},
      };

      annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

      annyang.start({ autoRestart: false });
    }
  }

  closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceActiveSectionListening = false;
    this.voiceText = undefined;

    if (annyang) {
      annyang.abort();
    }
  }
  // searchRecommanded()
  // {
  //   this.TrainingHttp.searchRecommanded().subscribe(
  //     (data:TrainingModel[])
  //   );
  // }

  addsearch(key:string){
/*
    let body = new HttpParams();
     body = body.set('text', key);

    // body = body.set('description', this.form.get(['description']).value);
    console.log( key);

    this.AdHttp.searchRecommanded(body)
    .toPromise()
    .then((response)=>{
      this.ngOnInit();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });

  }*/

}
/*
@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
  
})
export class AdvertisingComponent implements OnInit {

  countries : any [] = [];

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  advertising: Advertising = new Advertising();
  //config: NbToastrConfig;
  current: number=1;
  search: string="";
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  //position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  //status: NbComponentStatus = 'primary';


  dataAdvertisings: Advertising [] = [];

  @Output() addEventOutputEvent = new EventEmitter<Advertising>();

  constructor(private em: AdvertisingService, 
              private router: Router  ) {
  }


  ngOnInit(): void {
    this.getAllAds();
   // this.countries = GoogleCountries;
  }

  getAllAds(){
    this.em.getAdvertising().subscribe(
      (data: Advertising[]) => {
        this.dataAdvertisings = data;

      }
    );
  }

  getEventsByTitle(e,x) {
    this.filtre(e,x);
  }


  filtre(e,x) {
    this.em.getAdvertising().subscribe(
      (data: Advertising[]) => {
        this.dataAdvertisings = []
        this.dataAdvertisings = data.filter(
          (eventMarketing => {
            x === 'title' ? this.advertising.type  === e : eventMarketing.type === e;

          }  )

        )
      }, (err) => {
        return err;
      })
  }
/*
  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Add a new Event',
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this Event ?'});

 
  }

  add_Event(e: Advertising) {
    this.addEventOutputEvent.emit(e);
  }


  deleteAdvertising(id: number){
  	this.em.deleteAdvertising(id)
    .toPromise()
    .then((response)=>{
      this.em.getAdvertising();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
  }


  getEventsDesc() {
    this.cs.findAllCustomerDesc().subscribe(
      (data: Customer[]) => { this.dataCustomers = data; console.log(data) }, (err) => {
        console.log(err);
      },
    );
  }
  getEventsAsc() {
    this.cs.findAllCustomerAsc().subscribe(
      (data: Customer[]) => { this.dataCustomers = data; console.log(data) }, (err) => {
        console.log(err);
      },
    );
  }

  getEventsByStatus(e){
    this.filterByStatus(e);
  }

  filterByStatus(e){
    this.em.getAllEvents().subscribe(
      (data: EventMarketing[]) => {
        this.dataEventMarketings = []
        this.dataEventMarketings = data.filter(
          (d =>
              d.adresse === e
          )
        )
      }, (err) => {
        return err;
      })
  }




  addEvent(event) {
    this.em.addEvent(event.newData).subscribe(result => {
        this.showToast("success", "Add !!", "Event Added successffully  !!");
        event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showToast("danger", "Add !!", err.error.message);

        } else {
          this.showToast("danger", "Add !!", err.error.message);

        }
      }
    );
  }



  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
  exportAsXLSX(): void {
    //this.exportService.exportAsExcelFile(this.dataEventMarketings, 'dataEventMarketings');
  }


*/
}