import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingModel } from '../../model/training';
import { TrainingService } from '../../services/training.service';
import { map } from 'rxjs/operators';
// import { NgToastService } from 'ng-angular-popup';

import { title } from 'process';
//import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {
newTraining=new TrainingModel()

  token = localStorage.getItem('token');
  trainingsUrl:string = 'http://localhost:8089/WomenEmpowerment';
  training:TrainingModel;

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,private router:Router,private TrainingHttp: TrainingService,private http:HttpClient/*private toast: NgToastService *//*,private notfService:ToastrService*/) { }

    public notif(message):void
    {
     
      
        //this.notfService.success('this training is added successfuly!', 'training addes!');
      
    }

  addTraining(){
   console.log(this.form.getRawValue())
    this.TrainingHttp.createTraining(this.form.getRawValue())
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      console.log("rrrr")
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
    // this.toast.success({detail:"SUCCESS",summary:'Your Success Message'});
    }
  options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
   };

   ngOnInit():void {

    this.form = this.formBuilder.group({
      title:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      dateDebut:['', [Validators.required]],

      dateFin:new FormControl('',Validators.required),
      nbrMaxApprenant:['', [Validators.required]],
      affiche:['', [Validators.required]],

      
    });
  }
  
  image: File = null;
  onFileChanged(event) {
    this.image = <File>event.target.files[0];
    console.log(this.image);
   
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }

  // onSubmit(form: NgForm) {
  //   const formData = new FormData();
  //   const today = new Date();
    
  //   formData.append('title', form.value.title);
  //   formData.append('description', form.value.description);
  //   formData.append('dateDebut', today.toISOString());
  //   formData.append('dateFin', today.toISOString());
  //   formData.append('nbrMaxApprenant', form.value);
  //   formData.append('image', this.image);
  //   this.TrainingHttp.createTraining(formData).subscribe(
  //     (data) => {
  //       console.log(data);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
 

}
