import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { OfferModel } from 'src/app/model/offer.model';
import { AddOfferService } from 'src/app/services/addoffer.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-addoffer',
  templateUrl: './addoffer.component.html',
  styleUrls: ['./addoffer.component.scss']
})
export class AddofferComponent implements OnInit {

  offers: OfferModel[];
  p:number = 1 ;
  fileToUpload: File | null = null;
  jobofferForm : FormGroup;
  submitted = false;

  constructor(private OfferHttp: AddOfferService,
    private formBuilder: FormBuilder,
    private addOfferService: AddOfferService,private router: Router) { }

  ngOnInit(): void {

    this.jobofferForm = this.formBuilder.group({
      //title: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(6)]],
      domain: ['', Validators.required],
      place: ['', Validators.required],
      description: ['', [Validators.required,]],
      
  });
  }
  JobApplication(idOffer: number){
    this.addOfferService.AffecterOfferByUserId(idOffer,JSON.parse(localStorage.getItem('user')).email)
    .toPromise()
    .then((response)=>{
      this.ngOnInit();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
  }

  onSubmit(){
    console.log(this.jobofferForm.getRawValue())
     this.OfferHttp.addOffers(this.jobofferForm.getRawValue())
     .pipe(map((data)=>data))
     .toPromise()
     .then((response)=>{
      //window.location.reload()
      this.router.navigate(['/offers']); 
       
       console.log("rrrr")
     }).catch((error:HttpErrorResponse)=>{
       console.log(error)
     })
     }



}
