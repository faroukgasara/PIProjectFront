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
  public error:boolean = true ;
  prod :any={};
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
  userFile: any;
  imagePath: any;
  imgURL: any ;
  constructor(private formBuilder: FormBuilder,private publicationService : publicationService,private http:HttpClient,
              private router :Router) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      type:new FormControl('',Validators.required),
      picture :new FormControl('')
     
    });
  


  }
  getCurrentUser(): Observable<UserModel> {
    return this.currentUserSubject.asObservable();
  }

  somethingChanged(){
    let type = this.form.controls['type'].value;}
  submit(email :string,userfile :any) : void{
    let user = JSON.parse(localStorage.getItem('user'));
  

    
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };
    this.loading= true;
    this.http.post(`${this.apiURL}/${user.email}`,FormData ,options)
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
  onSelectFile(event:any) {
    console.log("right me")
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
     // this.f['profile'].setValue(file);
  
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";

      return;
      
    }
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;}}
  }

  addProduit(){
    this.publicationService.ajouterProduit(this.prod,this.userFile).subscribe((prod) => {
      
    console.log(prod)
    this.router.navigate(['/publication'])  
    
  
    });
    console.log("fafs")

    
   
    

}

}
