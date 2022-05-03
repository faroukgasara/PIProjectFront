import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { OfferModel } from 'src/app/model/offer.model';
import { OfferService } from 'src/app/services/offer.service';

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

  constructor(private OfferHttp: OfferService,private formBuilder: FormBuilder) {}
   

  ngOnInit(): void {
    this.OfferHttp.getOffers().subscribe(
  		(data:OfferModel[]) => {this.offers = data;console.log(this.offers)}
        //;console.log(this.offers);console.log("hi")}
  	);

    this.jobofferForm = this.formBuilder.group({
      //title: ['', Validators.required],
      Title: ['', [Validators.required, Validators.minLength(6)]],
      Domain: ['', Validators.required],
      Place: ['', Validators.required],
      description: ['', [Validators.required,]],
      
  });
  }

 get f() { return this.jobofferForm.controls; }

 onSubmit() {
  this.submitted = true;

  console.log(this.jobofferForm.getRawValue())
  // stop here if form is invalid
  if (this.jobofferForm.invalid) {
      return;
  }

  // display form values on success
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.jobofferForm.value, null, 4));
}

key:string='id';
reverse:boolean = false;
Sort(key){
  this.key = key
  this.reverse = !this.reverse;

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

addOffers(){

  this.OfferHttp.addOffers(this.jobofferForm.getRawValue()).subscribe();
}

  

updatOffers(){
  this.OfferHttp.updatOffers(this.jobofferForm.getRawValue()).subscribe();
}


/*handleFileInput(files: FileList) {
this.fileToUpload = files.item(0);
}*/

/*onReset() {
  this.submitted = false;
  this.jobofferForm.reset();
}*/

}
