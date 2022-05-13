import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddOfferService } from 'src/app/services/addoffer.service';
import { OfferService } from 'src/app/services/offer.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-updateoffer',
  templateUrl: './updateoffer.component.html',
  styleUrls: ['./updateoffer.component.scss']
})
export class UpdateofferComponent implements OnInit {

  jobofferForm : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UpdateofferComponent>,private OfferHttp: OfferService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addOfferService: AddOfferService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.jobofferForm = this.formBuilder.group({
      //title: ['', Validators.required],
      id: [this.data.offer.id, [Validators.required]],
      title: [this.data.offer.title, [Validators.required, Validators.minLength(6)]],
      domain: [this.data.offer.domain, Validators.required],
      place: [this.data.offer.place, Validators.required],
      description: [this.data.offer.description, [Validators.required,]],
      
  });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){
     this.OfferHttp.updatOffers(this.jobofferForm.getRawValue())
     .pipe(map((data)=>data))
     .toPromise()
     .then((response)=>{
       window.location.reload()
       
       console.log(this.jobofferForm.getRawValue())
     }).catch((error:HttpErrorResponse)=>{
       console.log(error)
     })
     }

}
