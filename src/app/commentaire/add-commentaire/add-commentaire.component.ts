import { Component, OnInit } from '@angular/core';



import { Router } from '@angular/router';
import { HttpClient,HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import jwt_decode from 'jwt-decode';
import { Commentaire } from 'src/app/model/commentaire.model';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { publicationService } from 'src/app/services/puplication.service';
@Component({
  selector: 'app-add-commentaire',
  templateUrl: './add-commentaire.component.html',
  styleUrls: ['./add-commentaire.component.scss']
})
export class AddCommentaireComponent implements OnInit {
 
  apiURL: string = 'http://localhost:8089/WomenEmpowerment/commentaire/add';
  private currentUserSubject = new BehaviorSubject<any>(null); // initializing with no user object since logged out
  id:any;
  token = localStorage.getItem('token');
  public error:boolean = true ;
  newPub = new Commentaire();
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
      comment:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
     
     
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("add-commentaire");


  }
 

  somethingChanged(){
    let type = this.form.controls['type'].value;}
  submit(id :number) : void{
    let user = JSON.parse(localStorage.getItem('user'));


    
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };
    this.loading= true;
     this.http.post("http://localhost:8089/WomenEmpowerment/commentaire/add/"+`${id}`+"/"+`${user.email}`,this.form.getRawValue(), options)
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      this.loading=false;
      this.error = false;
      this.router.navigate(['/commentaire'])
    }).catch((error:HttpErrorResponse)=>{
      this.error = true;
      this.loading=false;
    })

  }

  
   
    

}


