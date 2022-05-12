import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { publicationService } from 'src/app/services/puplication.service';
@Component({
  selector: 'app-updatepublication',
  templateUrl: './updatepublication.component.html',
  styleUrls: ['./updatepublication.component.scss']
})
export class UpdatepublicationComponent implements OnInit {
  apiURL: string = 'http://localhost:8089/WomenEmpowerment/publication/update';
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,public dialogRef: MatDialogRef<UpdatepublicationComponent>,private UserHttp: publicationService) { }

  use = JSON.parse(localStorage.getItem('update'));
  form!: FormGroup;
  ngOnInit():void {

    
    console.log(this.use);

    this.form = this.formBuilder.group({
      id:this.use.id,
  
        title:new FormControl(this.use.title,Validators.required),
        description:new FormControl(this.use.description,Validators.required),
        user:new FormControl(this.use.users.firstName,Validators.required),


      
    });
  }

  submit() : void{
    let user = JSON.parse(localStorage.getItem('user'));
  

    let token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    this.http.put(`${this.apiURL}/${user.email}`,this.form.getRawValue(),options)
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      window.location.reload();
      console.log("error")
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }

  hide() {
    this.dialogRef.close();
  }

}
