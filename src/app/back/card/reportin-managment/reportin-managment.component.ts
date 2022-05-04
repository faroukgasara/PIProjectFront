import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reportin-managment',
  templateUrl: './reportin-managment.component.html',
  styleUrls: ['./reportin-managment.component.scss']
})
export class ReportinManagmentComponent implements OnInit {

  constructor(private UserHttp: UserService) { }

  reported_by:any;
  p:number = 1 ;
  users:any;
  ngOnInit(): void {
    this.getReporting();
  }

  Search(){
    if(this.reported_by==""){
      this.ngOnInit();
    }else{
      this.users = this.users.filter(res=>{
        return res.reported_by.toLocaleLowerCase().match(this.reported_by.toLocaleLowerCase());
      })
    }
  }
  key:string='id';
  reverse:boolean = false;
  Sort(key){
    this.key = key
    this.reverse = !this.reverse;

  }

  deleteReporting(id: number){
  	this.UserHttp.deleteReporting(id)
    .toPromise()
    .then((response)=>{
      this.getReporting();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
  }

  getReporting(){
    this.UserHttp.getReporting().subscribe(
  		(data) => {this.users=data;console.log(this.users)}
  	);
  }

}
