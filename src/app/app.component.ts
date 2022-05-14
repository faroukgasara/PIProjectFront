import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  Inject
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import * as firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
const cofig={
  apiKey :"AIzaSyAv7RRPgXG4w-YKe1d5hzL2vjiEEzqk-bM",
  databaseURL:"https://angularchatmsg-default-rtdb.firebaseio.com"
};
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  public accessGranted:boolean ;
  constructor(
    private renderer: Renderer2,
    public location: Location,

    @Inject(DOCUMENT) document
  ) {firebase.initializeApp(cofig);


  }
  
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-danger");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      }
    }
  }
  
  ngOnInit() {
    this.onWindowScroll(event);
    if(this.user.appUserRole=='ADMIN'){
      this.accessGranted=true
    }else{
      this.accessGranted=false
    }
    
  }
}
