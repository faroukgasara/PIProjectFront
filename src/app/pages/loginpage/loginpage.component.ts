import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/model/user.model';
@Component({
  selector: 'app-loginpage',
  templateUrl: 'loginpage.component.html'
})
export class LoginpageComponent implements OnInit , OnDestroy{
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  token;
  email;
  public loading:boolean = false ;
  public error:boolean = false ;
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router) { }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }

  ngOnInit():void {
    this.form = this.formBuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:['', [Validators.required]],
    });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");

    this.onMouseMove(event);
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
  }

  submit():void{
    let body = new URLSearchParams();
    body.set('email', this.form.get(['email']).value);
    body.set('password', this.form.get(['password']).value);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      withCreadentials:true
    };
    this.loading= true;
    this.http.post('http://localhost:8089/WomenEmpowerment/login',body.toString(), options)
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      //this.router.navigate(['/home'])
      let resSTR = JSON.stringify(response);
      let resJSON = JSON.parse(resSTR);
     // console.log(resJSON.access_token);
      //console.log(resJSON.refresh_token);
      //console.log(resJSON.user);
      this.token = resJSON.access_token;
      this.email = resJSON.user;
      this.saveCurrentUser(this.token,this.email);
      this.loading=false;
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
      console.log("non")
      this.loading=false;
      this.error=true;
    })
  }

  saveCurrentUser(token,email):void{
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    this.http.get("http://localhost:8089/WomenEmpowerment/user/findByEmail/"+email, options)
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      let resSTR = JSON.stringify(response);
      let resJSON = JSON.parse(resSTR);
      var testObject =resJSON;
      localStorage.setItem('token',token);
      localStorage.setItem('user', JSON.stringify(testObject));
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(user.appUserRole);
      this.router.navigate(['/home']).then(()=>{
        location.reload() ;
      });
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
      console.log("non")
    })

  }

}
