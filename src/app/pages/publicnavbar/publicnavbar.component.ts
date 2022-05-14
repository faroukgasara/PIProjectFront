import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { UserService } from 'src/app/services/user.service';
import { ChatbotComponent } from '../index/chatbot/chatbot.component';
import { NotificationuserfrontComponent } from './notificationuserfront/notificationuserfront.component';

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
  public nb:boolean=false;
  notification:any ; 
  public alertnot:boolean=false
  user = JSON.parse(localStorage.getItem('user'));
  token = localStorage.getItem('token');
  constructor(private UserHttp: UserService,private dialog :MatDialog ,private router:Router,private SubscribeHttp: SubscribeService) { }

  ngOnInit() {
    



    
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("publicnavbar");

    if(this.token==null || this.user.appUserRole==null){
      this.Login = true;
      this.Registration = true;
      this.Logout=false;
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

    this.UserHttp.getNotif().subscribe(
  		(data) => { this.notification=data;
      
        for (let index = 0; index < Object.keys(data).length ; index++) {
          if(Object.values(data)[index].readAt==null){
            this.alertnot=false
          }
        }
      }
  	);
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


  notif(){
    this.nb=true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "30%";
    dialogConfig.height="50%";
    dialogConfig.position = { right: '22%',top: '5%'};
    this.dialog.open(NotificationuserfrontComponent,dialogConfig);

  }


}
