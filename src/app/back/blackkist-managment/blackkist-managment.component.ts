import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { MatDialog ,MatDialogConfig} from '@angular/material/dialog';
import { AddToblacklistComponent } from './add-toblacklist/add-toblacklist.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blackkist-managment',
  templateUrl: './blackkist-managment.component.html',
  styleUrls: ['./blackkist-managment.component.scss']
})
export class BlackkistManagmentComponent implements OnInit {

  constructor(private dialog :MatDialog ,private breakpointObserver: BreakpointObserver,private UserHttp: UserService,private router:Router) { }

  email:any;
  p:number = 1 ;
  users:any;
  ngOnInit(): void {
    this.getBlacklist();
  }


  getBlacklist(){
    this.UserHttp.getBlacklist().subscribe(
  		(data) => {this.users=data;}
  	);
  }

  Search(){
    if(this.email==""){
      this.ngOnInit();
    }else{
      this.users = this.users.filter(res=>{
        return res.email.toLocaleLowerCase().match(this.email.toLocaleLowerCase());
      })
    }
  }

  key:string='id';
  reverse:boolean = false;
  Sort(key){
    this.key = key
    this.reverse = !this.reverse;

  }

  deleteFromBlacklist(id: number){
  	this.UserHttp.deleteFromBlacklist(id)
    .toPromise()
    .then((response)=>{
      this.getBlacklist();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "30%";
    this.dialog.open(AddToblacklistComponent,dialogConfig);
  }
}
