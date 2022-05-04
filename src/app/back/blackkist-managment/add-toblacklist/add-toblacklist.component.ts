import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BlackkistManagmentComponent } from '../blackkist-managment.component';

@Component({
  selector: 'app-add-toblacklist',
  templateUrl: './add-toblacklist.component.html',
  styleUrls: ['./add-toblacklist.component.scss']
})
export class AddToblacklistComponent implements OnInit {

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,public dialogRef: MatDialogRef<AddToblacklistComponent>,private UserHttp: UserService) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
    });
  }

  onSubmit() {
    this.UserHttp.addToBlacklist(this.form.get(['email']).value)
    .toPromise()
    .then((response)=>{
      this.dialogRef.close();
      this.router.navigate(['/blacklist']).then(()=>{
        location.reload() ;
      });
      
      
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
  }

  hide() {
    this.dialogRef.close();
  }

}