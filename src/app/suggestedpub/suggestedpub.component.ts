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
import { RateService } from '../services/rate.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";



@Component({
  selector: 'app-suggestedpub',
  templateUrl: './suggestedpub.component.html',
  styleUrls: ['./suggestedpub.component.scss']
})
export class SuggestedpubComponent implements OnInit {
  channels: any;
  publications : any[];
  listProducts : any; 
  constructor(private formBuilder: FormBuilder,private publicationService : publicationService,  private like : RateService ,
    private router :Router,
  private comserv : CommentaireService,private http:HttpClient,private dialog:MatDialog) { 
  }

  ngOnInit():void {
  
  
    this.publicationService.getChannnels().subscribe(pubs => {
      console.log(pubs);
      this.publications = pubs;
      });
  
    }
}


