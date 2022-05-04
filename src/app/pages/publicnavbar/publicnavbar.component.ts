import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { ChatbotComponent } from '../index/chatbot/chatbot.component';

@Component({
  selector: "app-publicnavbar",
  templateUrl: "publicnavbar.component.html"
})
export class PublicnavbarComponent implements OnInit, OnDestroy {
  public isDisabled :boolean ;

  isCollapsed = true;
  public Login:boolean  ;
  public Logout:boolean  ;
  public Registration:boolean ;
  user = JSON.parse(localStorage.getItem('user'));
  token = localStorage.getItem('token');
  constructor(private dialog :MatDialog ,private router:Router,private SubscribeHttp: SubscribeService) { }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("publicnavbar");

    if(this.token==null || this.user.appUserRole==null){
      this.Login = true;
      this.Registration = true;
      this.Logout=false
    }else{
      this.Login = false;
      this.Registration = false;
      this.Logout=true

    }
    if( localStorage.getItem('sub') ==="true" ){
      this.isDisabled = true;
    }else if(Number(this.user.subscriber.id)){
      this.isDisabled = true;
    }else{
      this.isDisabled = false;
    }
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("publicnavbar");
    
  }

  addSubscriber(){
    this.SubscribeHttp.addSubscriber()
    .toPromise()
    .then((response)=>{
      this.SubscribeHttp.genrateAndDownloadQRCode();
      localStorage.setItem('sub',"true");
      location.reload() ;
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']).then(()=>{
      location.reload() ;
    })
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "40%";
    dialogConfig.height="70%";
    this.dialog.open(ChatbotComponent,dialogConfig);
  }

}
