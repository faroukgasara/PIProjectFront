import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,public dialogRef: MatDialogRef<UpdateprofileComponent>,private UserHttp: UserService) { }

  use = JSON.parse(localStorage.getItem('update'));
  form!: FormGroup;
  ngOnInit():void {

    
    console.log(this.use.appUserRole);

    this.form = this.formBuilder.group({
      id:this.use.id,
      firstName:new FormControl(this.use.firstName,Validators.required),
      lastName:new FormControl(this.use.lastName,Validators.required),
      password:[this.use.password, [Validators.required]],
      email:this.use.email,
      appUserRole:this.use.appUserRole,
      adress:new FormControl(this.use.adress,Validators.required),
      associationName:new FormControl(this.use.associationName,Validators.required),
      companyName:new FormControl(this.use.companyName,Validators.required),
      numTel:new FormControl(this.use.numTel,Validators.required),
      cin:new FormControl(this.use.cin,Validators.required),
      age:new FormControl(this.use.age,Validators.required),
      profession:new FormControl(this.use.profession,Validators.required),
      niveauetude:new FormControl(this.use.niveauetude,Validators.required),
      description:new FormControl(this.use.description,Validators.required),

      
    });
  }

  submit() : void{
    let token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    this.http.put('http://localhost:8089/WomenEmpowerment/user/updateUser',this.form.getRawValue(),options)
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
