


import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

 @Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit{
  users: UserModel[];
  p:number = 1 ;

  constructor(
    private UserHttp: UserService) {}

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
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });
  }

  key:string='id';
  reverse:boolean = false;
  Sort(key){
    this.key = key
    this.reverse = !this.reverse;

  }
}
