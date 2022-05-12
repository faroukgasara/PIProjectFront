import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { UpdateprofileComponent } from '../../updateprofile/updateprofile.component';
import { PredictionEmotionComponent } from './prediction-emotion/prediction-emotion.component';
import {NgxPrintModule} from 'ngx-print';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private dialog :MatDialog ,private UserHttp: UserService) { }
  users: UserModel[]=[];
  firstName:any;
  p:number = 1 ;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.UserHttp.getUsers().subscribe(
  		(data:UserModel[]) => {this.users = data}
  	);
  }

  deleteUser(email: string){
  	this.UserHttp.deleteUser(email)
    .toPromise()
    .then((response)=>{
      this.getUsers();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
  }

  
  Search(){
    if(this.firstName==""){
      this.ngOnInit();
    }else{
      this.users = this.users.filter(res=>{
        return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
      })
    }
  }
  key:string='id';
  reverse:boolean = false;
  Sort(key){
    this.key = key
    this.reverse = !this.reverse;
  }


  Prediction(us) {
    localStorage.setItem('prediction', JSON.stringify(us));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "40%";
    this.dialog.open(PredictionEmotionComponent,dialogConfig);
  }


  onCreate(us) {
    localStorage.setItem('update', JSON.stringify(us));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "80%";
    this.dialog.open(UpdateprofileComponent,dialogConfig);
  }

}
