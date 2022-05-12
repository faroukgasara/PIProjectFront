import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { NotificationuserService } from 'src/app/services/nofificationuser.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notificationuser',
  templateUrl: './notificationuser.component.html',
  styleUrls: ['./notificationuser.component.scss']
})
export class NotificationuserComponent implements OnInit {

  
  users: UserModel[];
  form!: FormGroup;
  constructor(private NotifHttp: NotificationuserService,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<NotificationuserComponent>,private UserHttp: UserService,private router:Router) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email:'',
      description:'',
      checkbox1:'',
    });

    this.UserHttp.getUsers().subscribe(
  		(data:UserModel[]) => {this.users = data}
  	);
  }

  hide() {
    this.dialogRef.close();
  }
  add(){
   if( this.form.get(['checkbox1']).value==true){
    this.NotifHttp.addGlobal(this.form.get(['description']).value)
    .toPromise()
    .then((response)=>{
      this.dialogRef.close();
      this.router.navigate(['/dashboard']).then(()=>{
        location.reload() ;
      });
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });

   }else{
    this.NotifHttp.addNotif(this.form.get(['email']).value,this.form.get(['description']).value)
    .toPromise()
    .then((response)=>{
      this.dialogRef.close();
      this.router.navigate(['/dashboard']).then(()=>{
        location.reload() ;
      });
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
   }


  }

}
