import { Component, OnInit } from '@angular/core';

import { Router ,RouterModule,ActivatedRoute,Params} from '@angular/router';
import { publication } from 'src/app/model/publication.model';
import { publicationService } from 'src/app/services/puplication.service';


@Component({
  selector: 'app-publication',
  templateUrl: './details.component.html'
})
export class detailsComponent implements OnInit {
    post :publication;
    id: Number;
    allowRate = true;
    author = "";
   

    constructor(private postService: publicationService, private router: ActivatedRoute) {
    }

    ngOnInit() {
        this.router.params.subscribe(params => {
            this.id = params['id'];
          });
      
          this.postService.getPost(this.id).subscribe((data:publication) => {
            this.post = data;
            
          },(err: any) => {
            console.log('Failure Response');

          })
          
        }
        

    

  
}
