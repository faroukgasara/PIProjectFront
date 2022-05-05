import { Component, OnInit } from '@angular/core';
import { publication } from '../model/publication.model';
import { publicationService } from '../services/puplication.service';
import { Router ,RouterModule,ActivatedRoute} from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Commentaire } from '../model/commentaire.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CommentaireService } from '../services/commentaire.service';
import { ListCommentComponent } from '../list-comment/list-comment.component';
import { MatDialog } from '@angular/material/dialog';
import { RateService } from '../services/rate.service';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ["./publication.component.css"]
})
export class PublicationComponent implements OnInit {
  Likes:any={}
  currentRate = 0;
  apiURL: string = 'http://localhost:8089/WomenEmpowerment/commentaire/add';
  p:number = 1 ;
  id:any;
    token = localStorage.getItem('token');
  public error:boolean = true ;
  newPub = new Commentaire();
  isCollapsed = true;
  public isFirstNameShown:boolean = true ;
  public isLastNameShown:boolean = true ;
  focus;
  commentaires : Commentaire[];
  focus1;
  focus2;
  focus3;
  public loading:boolean = false ;
  message :string;
  form!: FormGroup;
  searchTerm: string;
  listProducts : any; 
  post: publication;
  publications : publication[];
  permaLink: Number;
  userFile: any;
  constructor(private formBuilder: FormBuilder,private publicationService : publicationService,  private like : RateService ,
             private router :Router,
           private comserv : CommentaireService,private http:HttpClient,private dialog:MatDialog) { 

   //this.produits = produitService.listeProduit();
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comment:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),

     
     
    });
    this.form=this.formBuilder.group({

      rate : new FormControl('',Validators.required)
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("add-commentaire");


  
    this.publicationService.listeProduit().subscribe(pubs => {
      console.log(pubs);
      this.publications = pubs;
      });
      this.comserv.getComm(5).subscribe(com =>
        {
          console.log(com);
          this.commentaires=com;
        })
    
  }
 
  
  
  getAllProducts(){
    this.publicationService.listeProduit().subscribe(res => this.listProducts = res)
  }
supprimerProduit(id: number)
{
  this.publicationService.supprimerPublication(id)
    .toPromise()
    .then((response)=>{
      this.ngOnInit();
    }).catch((error:HttpErrorResponse)=>{console.log(error)
    });
}

submit(id :number) : void{
  let user = JSON.parse(localStorage.getItem('user'));
  let publication = JSON.parse(localStorage.getItem('publication'));


  
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
 
 getComm(id:number)
{this.comserv.getComm(id).subscribe(
  (data:Commentaire[]) => {this.commentaires = data}
  );
}

findByPub(id:any):any{
  const dialogRef = this.dialog.open(ListCommentComponent, {
    width: '50%',
    data: {
      id
    }
  });

}
OnRate(id:any){
    
   
    
  this.like.addRate(id,this.Likes).subscribe({
    next:(data:any)=>{
console.log("mchet");
window.location.reload();


      },
      error:(err:any)=>{
        console.log("err")
        console.log(err)
        console.log(this.id)

      
      },
      complete:()=>{},
  
  })
}

}
