import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from '../model/commentaire.model';
import { CommentaireService } from '../services/commentaire.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  listProducts : any; 
  post: Commentaire;
  commentaires : Commentaire[];
  permaLink: Number;
  constructor(private publicationService : CommentaireService,
             private router :Router,
             private routers :ActivatedRoute) { 

   //this.produits = produitService.listeProduit();
    
  }
  token = localStorage.getItem('token');

  ngOnInit(): void {
    this.publicationService.listeProdt().subscribe(pubs => {
      console.log(pubs);
      this.commentaires = pubs;
      });
    
  }
  getOne(id :number) {
    this.routers.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.publicationService.getPost(id).subscribe((data:Commentaire) => {
      this.post = data;
    },(err: any) => {
      console.log('Failure Response');
    })
  }
  
  reloadComponent() {
    let currentUrl = this. router. url;
    this. router. routeReuseStrategy. shouldReuseRoute = () => false;
    this. router. onSameUrlNavigation = 'reload';
    this. router. navigate([currentUrl]);
    }
    refresh(): void {
      window.location.reload();
  }

  getAllProducts(){
    this.publicationService.listeProdt().subscribe(res => this.listProducts = res)
  }
supprimerProduit(id: number)
{
  console.log("suppppppppppppppppppppppppppppp supprimé");
 
let conf = confirm("Etes-vous sûr ?");
if (conf)


  this.publicationService.supprimerPublation(id).subscribe(() => this.getAllProducts());
  this.refresh();
  this.reloadComponent;
  

}



}
