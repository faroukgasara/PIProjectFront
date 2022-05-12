import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Advertising } from '../../model/advertising';
import { AdvertisingService } from '../../services/advertising.service';

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

 
  }*/

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
    /*this.cs.findAllCustomerDesc().subscribe(
      (data: Customer[]) => { this.dataCustomers = data; console.log(data) }, (err) => {
        console.log(err);
      },
    );*/
  }
  getEventsAsc() {
    /*this.cs.findAllCustomerAsc().subscribe(
      (data: Customer[]) => { this.dataCustomers = data; console.log(data) }, (err) => {
        console.log(err);
      },
    );*/
  }

  getEventsByStatus(e){
    this.filterByStatus(e);
  }

  filterByStatus(e){
    /*$this.em.getAllEvents().subscribe(
      (data: EventMarketing[]) => {
        this.dataEventMarketings = []
        this.dataEventMarketings = data.filter(
          (d =>
              d.adresse === e
          )
        )
      }, (err) => {
        return err;
      })*/
  }




  addEvent(event) {
    /*this.em.addEvent(event.newData).subscribe(result => {
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
    );*/
  }


/*
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
  }*/

  exportAsXLSX(): void {
    //this.exportService.exportAsExcelFile(this.dataEventMarketings, 'dataEventMarketings');
  }

}
