import { Component, OnInit } from '@angular/core';
import { publication } from '../model/publication.model';
import { publicationService } from '../services/puplication.service';
import { Router ,RouterModule,ActivatedRoute,Params} from '@angular/router';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-publication',
  templateUrl: './detailpublication.component.html'
})
export class detailsPublicationComponent implements OnInit {
    post = {} as publication;
    id: number;
    allowRate = true;
    author = "";
   

    constructor(private postService: publicationService, private router: ActivatedRoute) {
    }

    ngOnInit() {
        let username = JSON.parse(localStorage.getItem('user'));


        this.router.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.postService.getPost(this.id)
                    .subscribe(
                    (data: publication) => {
                        this.post = data;
                        this.author = data.id;
                        console.log(this.post);
                    },
                    (error) => console.log(error)
                );
            }
        );
    }

    onRate(buttonState: number) {
        this.allowRate = false;
        //this.postService.changeRatingPoints(this.id, buttonState);
    }

    onDeletePost() {
        this.postService.supprimerPublication(this.id);
    }
}
