import { Component, OnInit, OnDestroy, HostListener, ViewChild } from "@angular/core";
import { publication } from '../model/publication.model';
import { UserModel } from '../model/user.model';

import { publicationService } from '../services/puplication.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'add-publication',
  templateUrl: './add-publication.component.html'
})
export class AddPublicationComponent implements OnInit {
 
  apiURL: string = 'http://localhost:8089/WomenEmpowerment/publication/add';
  private currentUserSubject = new BehaviorSubject<any>(null); // initializing with no user object since logged out

  token = localStorage.getItem('token');
  public error:boolean = false ;
  newPub = new publication();
  isCollapsed = true;
  public isFirstNameShown:boolean = true ;
  public isLastNameShown:boolean = true ;
  focus;

  focus1;
  focus2;
  focus3;
  public loading:boolean = false ;
  message :string;
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,private publicationService : publicationService,private http:HttpClient,
              private router :Router) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
     
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("add-publication");


  }
  getCurrentUser(): Observable<UserModel> {
    return this.currentUserSubject.asObservable();
  }

  somethingChanged(){
    let type = this.form.controls['type'].value;}
  submit(email :string) : void{
    let user = JSON.parse(localStorage.getItem('user'));


    
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };
    this.loading= true;
    this.http.post(`${this.apiURL}/${user.email}`,this.form.getRawValue(),options)
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      this.loading=false;
      this.error = false;
      this.router.navigate(['/publication'])
    }).catch((error:HttpErrorResponse)=>{
      this.error = true;
      this.loading=false;
    })

  }

  addProduit(){
    this.publicationService.ajouterProduit(this.newPub).subscribe(prod => {
    console.log(prod);
    
  
    });

    this.router.navigate(['publications']).then(() => {
      window.location.reload();
      });
   
    

}

}
