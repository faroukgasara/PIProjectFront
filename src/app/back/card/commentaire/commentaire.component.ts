import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { emit } from 'process';
import { Commentaire } from 'src/app/model/commentaire.model';

import { CommentaireService } from '../../../services/commentaire.service';
import { LikeService } from '../../../services/like.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {
  listProducts : any; 
  id:any;
  commentaires : Commentaire[];
  permaLink: Number;
  Likes:any={}
  likedBy:any={}
  constructor(private publicationService : CommentaireService,
             private router :Router,
             private routers :ActivatedRoute,
             private like : LikeService 
  ) { 

   //this.produits = produitService.listeProduit();
    
  }
  token = localStorage.getItem('token');

  ngOnInit() {
    this.getUsers();
    
  }
  
  getUsers(){
    this.publicationService.getUsers().subscribe(
  		(data:Commentaire[]) => {this.commentaires = data}
  	);
  }
  
  /*getOne(id :number) {
    this.routers.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.publicationService.getPost(id).subscribe((data:Commentaire) => {
      this.post = data;
    },(err: any) => {
      console.log('Failure Response');
    })
  }
  */
  reloadComponent() {
    let currentUrl = this. router. url;
    this. router. routeReuseStrategy. shouldReuseRoute = () => false;
    this. router. onSameUrlNavigation = 'reload';
    this. router. navigate([currentUrl]);
    
    }
    refresh(): void {
      window.location.reload();
  }
  OnLike(id:any){
     
   
    
    this.like.addlike(id,this.Likes).subscribe({
      next:(data:any)=>{
console.log("mchet");


        },
        error:(err:any)=>{
          console.log("err")
          console.log(err)
          console.log(this.id)

        
        },
        complete:()=>{},
    
    })
  }
  supprimerComm(id: number)
  {
    console.log("suppppppppppppppppppppppppppppp supprimé");
   
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  
  
    this.publicationService.supprimerPublication(id).subscribe(() => this.getUsers());
   
    window.location.reload();
  
  }


  getComm(id:number)
  {this.publicationService.getComm(id).subscribe(
    (data:Commentaire[]) => {this.commentaires = data}
  	);
  }
}
