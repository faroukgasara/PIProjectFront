import { Component, OnInit } from '@angular/core';
import { publication } from '../model/publication.model';
import { publicationService } from '../services/puplication.service';
import { Router ,RouterModule,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ["./publication.component.css"]
})
export class PublicationComponent implements OnInit {
  listProducts : any; 
  post: publication;
  publications : publication[];
  permaLink: Number;
  constructor(private publicationService : publicationService,
             private router :Router,
             private routers :ActivatedRoute) { 

   //this.produits = produitService.listeProduit();
    
  }
  token = localStorage.getItem('token');

  ngOnInit(): void {
    this.publicationService.listeProduit().subscribe(pubs => {
      console.log(pubs);
      this.publications = pubs;
      });
    
  }
  getOne(id :number) {
    this.routers.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.publicationService.getPost(id).subscribe((data:publication) => {
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
    this.publicationService.listeProduit().subscribe(res => this.listProducts = res)
  }
supprimerProduit(id: number)
{
  console.log("suppppppppppppppppppppppppppppp supprimé");
 
let conf = confirm("Etes-vous sûr ?");
if (conf)


  this.publicationService.supprimerPublication(id).subscribe(() => this.getAllProducts());
  this.refresh();
  this.reloadComponent;
  

}



}
