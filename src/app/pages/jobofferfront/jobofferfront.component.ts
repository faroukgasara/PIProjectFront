import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OfferModel } from 'src/app/model/offer.model';
import { JobofferfrontService } from 'src/app/services/Jobofferfront.service';
import { OfferService } from 'src/app/services/offer.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-jobofferfront',
  templateUrl: './jobofferfront.component.html',
  styleUrls: ['./jobofferfront.component.scss']
})
export class JobofferfrontComponent implements OnInit {
  @ViewChild("UploadFile", {static: false}) UploadFile: ElementRef;files  = [];  
    fileName:string;
    offers: OfferModel[];
    sugg: any=[];
    title: OfferModel[];

  //file:any;
  barWidth:string="0%";

  constructor(private http:HttpClient, private jobofferfrontService :JobofferfrontService
    , private OfferHttp: OfferService,   private offerService: OfferService) { //i'm not sure !!!!!!
    
  
   }

  ngOnInit(): void {
    this.suggestedOffer();
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
//************************** */


onClick() {  
  const UploadFile= this.UploadFile.nativeElement;UploadFile.onchange = () => {  
  for (let index = 0; index < UploadFile.files.length; index++)  
  {  
   const file = UploadFile.files[index];  
    this.fileName = file.name +" is uploaded"
   
   this.files.push({ data: file, inProgress: false, progress: 0});  
  }  
    this.uploadFiles();  
  };  
  UploadFile.click();  
}
private uploadFiles() {  
this.UploadFile.nativeElement.value = '';  
this.files.forEach(file => {  
  this.uploadFile(file);  
});  
}
uploadFile(file) {  
const formData = new FormData();  
formData.append('file', file.data);  
file.inProgress = true;  
this.jobofferfrontService.upload(formData).subscribe(
  rsp => {
    console.log(rsp.type)


   
},
  error => {
    console.log(error)
  });

}

JobApplication(idOffer: number){
  this.jobofferfrontService.JobApplication(JSON.parse(localStorage.getItem('user')).email,idOffer)
  .toPromise()
  .then((response)=>{
    this.ngOnInit();
  }).catch((error:HttpErrorResponse)=>{
    console.log(error)
  });
  Swal.fire('Congrats!', ' You Applyed successfully', 'success')
}

suggestedOffer(){

  this.jobofferfrontService.suggestedOffer().subscribe(
    (data)=>{this.sugg=data;console.log(this.sugg)
    

    }
  );
}
//******************recherche  */
FindOfferByTitle(Title: string) {
 this.OfferHttp.getOffers().subscribe(
   (data:OfferModel[]) => {this.offers = data;console.log(this.title)});

}

//********************filter  */

search($event) {
  const { value } = $event.target;
  if (!value) {
    //this.getOffers();
    return;
  }
  this.offers= this.offers?.filter(function (item) {
    if (item.Title.includes(value) || item.description.includes(value))
      return item;
  });
}


  successAlertNotification(){
    Swal.fire('Hi', 'Congrats! operation successfull', 'success')
  }





/*
  getFile(event:any){
    this.file = event.target.files[0];
    console.log('file',this.file);
  }
   submitData(){
     let formData= new FormData();
     //formData.set("name",this.name);
     formData.set("file",this.file);
     //submit the data in API
     this.http.post('http://localhost:8089/WomenEmpowerment/Offer/file',formData).subscribe(
       (response)=>{}
     )

   }*/


}
