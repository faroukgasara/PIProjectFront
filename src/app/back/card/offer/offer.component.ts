import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { OfferModel } from 'src/app/model/offer.model';
import { OfferService } from 'src/app/services/offer.service';
import { UpdateofferComponent } from './updateoffer/updateoffer.component';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  
  offers: OfferModel[];

  p:number = 1 ;

  fileToUpload: File | null = null;
  jobofferForm : FormGroup;
  submitted = false;

  constructor(private OfferHttp: OfferService,
              private formBuilder: FormBuilder,
              private offerService: OfferService,public dialog: MatDialog) {}
   

  ngOnInit(): void {
    this.OfferHttp.getOffers().subscribe(
  		(data:OfferModel[]) => {this.offers = data;console.log(this.offers)}
        //;console.log(this.offers);console.log("hi")}
  	);



   /* this.jobofferForm = this.formBuilder.group({
      //title: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(6)]],
      domain: ['', Validators.required],
      place: ['', Validators.required],
      description: ['', [Validators.required,]],
      
  });*/
  }

 get f() { return this.jobofferForm.controls; }


key:string='id';
reverse:boolean = false;
Sort(key){
  this.key = key
  this.reverse = !this.reverse;

}

updatOffers(){
  this.OfferHttp.updatOffers(this.jobofferForm.getRawValue()).subscribe();
}

openDialog(offer:any): void {
  const dialogRef = this.dialog.open(UpdateofferComponent, {
    width: '90%',
    data: {offer:offer}
  });
  
}

deleteOffer(id: number){
  this.OfferHttp.deleteOffer(id)
  .toPromise()
  .then((response)=>{
    this.ngOnInit();
  }).catch((error:HttpErrorResponse)=>{
    console.log(error)
  });  
}
/*onReset() {
  this.submitted = false;
  this.jobofferForm.reset();
}*/

/*addOffers(){

  this.OfferHttp.addOffers(this.jobofferForm.getRawValue()).subscribe();
}*/

/*onSubmit(){
  console.log(this.jobofferForm.getRawValue())
   this.OfferHttp.addOffers(this.jobofferForm.getRawValue())
   .pipe(map((data)=>data))
   .toPromise()
   .then((response)=>{
     this.ngOnInit();
     console.log("rrrr")
   }).catch((error:HttpErrorResponse)=>{
     console.log(error)
   })
   }*/

/*handleFileInput(files: FileList) {
this.fileToUpload = files.item(0);
}*/

/*onReset() {
  this.submitted = false;
  this.jobofferForm.reset();
}*/

/*onSubmit() {
  if (this.jobofferForm.valid) {
    console.log("Form Submitted!");
    this.jobofferForm.reset();
  }
}*/

}
