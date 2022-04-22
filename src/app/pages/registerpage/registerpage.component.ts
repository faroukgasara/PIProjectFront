import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit, OnDestroy, HostListener, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html"
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  form!: FormGroup;
  public isFirstNameShown:boolean = true ;
  public isLastNameShown:boolean = true ;
  public cin:boolean = true ;
  public Age:boolean = true ;
  public profession:boolean = true ;
  public niveauetude:boolean = true ;
  public error:boolean = false ;
  public loading:boolean = false ;
  public companyName:boolean = false ;
  public associationName:boolean = false ;


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
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      password:['', [Validators.required]],
      email:new FormControl('',[Validators.email,Validators.required]),
      appUserRole:'',
      adress:new FormControl('',Validators.required),
      confirmpassword:['', [Validators.required]],
      associationName:new FormControl('',Validators.required),
      companyName:new FormControl('',Validators.required),
      numTel:new FormControl('',Validators.required),
      cin:new FormControl('',Validators.required),
      age:new FormControl('',Validators.required),
      profession:new FormControl('',Validators.required),
      niveauetude:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),

      
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);


  }
  somethingChanged(){
    let role = this.form.controls['appUserRole'].value;
    if(role == 'USER' || role == 'TRAINER'|| role == 'MEDCIN'|| role == 'LAWYER' || role == 'PSY' ){
      this.isFirstNameShown = true;
      this.Age = true ;
      this.cin=true;
      this.isLastNameShown=true;
      this.profession=true;
      this.niveauetude=true;
      this.associationName = false;
      this.companyName = false;
    }else if(role == 'COMPANY'){
      this.isFirstNameShown = false;
      this.Age = false ;
      this.cin=false;
      this.isLastNameShown=false;
      this.profession=false;
      this.niveauetude=false;
      this.associationName = false;
      this.companyName = true;
    }else if(role == 'ASSOCIATION'){
      this.isFirstNameShown = false;
      this.Age = false ;
      this.cin=false;
      this.isLastNameShown=false;
      this.profession=false;
      this.niveauetude=false;
      this.associationName = true;
      this.companyName = false;
    }

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }


  submit() : void{
    this.loading= true;
    this.http.post('http://localhost:8089/WomenEmpowerment/registration',this.form.getRawValue())
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      this.loading=false;
      this.error = false;
      this.router.navigate(['/login'])
    }).catch((error:HttpErrorResponse)=>{
      this.error = true;
      this.loading=false;
    })

  }
}
