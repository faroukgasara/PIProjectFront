import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-publicnavbar",
  templateUrl: "publicnavbar.component.html"
})
export class PublicnavbarComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  public Login:boolean  ;
  public Logout:boolean  ;
  public Registration:boolean ;
  user = JSON.parse(localStorage.getItem('user'));
  token = localStorage.getItem('token');
  constructor(private router:Router) { }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("publicnavbar");

    if(this.token==null || this.user.appUserRole==null){
      this.Login = true;
      this.Registration = true;
      this.Logout=false
      //this.router.navigate(['/login'])
    }else{
      this.Login = false;
      this.Registration = false;
      this.Logout=true

    }
    //window.location.reload();
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("publicnavbar");
    
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']).then(()=>{
      location.reload() ;
    })
    
    
  }

}
