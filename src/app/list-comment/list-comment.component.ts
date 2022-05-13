import { HttpHeaders } from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Commentaire } from '../model/commentaire.model';
import { CommentaireService } from '../services/commentaire.service';
import { DislikeService } from '../services/dislike.service';
import { LikeService } from '../services/like.service';
import { publicationService } from '../services/puplication.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {
  Likes:any={}
  dislike:any={}
  token = localStorage.getItem('token');

  id:any;
  comm:Commentaire;
  commentaires: Commentaire[] = [];
  constructor(

    private dialog: MatDialog,
    private service: publicationService,
    private commService:CommentaireService,
    private like : LikeService ,
    private dis : DislikeService ,
    private dialogRef: MatDialogRef<ListCommentComponent>,
    @Inject(MAT_DIALOG_DATA)  private data: any
  ) { }

  ngOnInit(): void {
    this.commService.getComm(this.data.id).subscribe(data => {
      this.commentaires =data;
    })
  }

  getUsers(){
    this.commService.getUsers().subscribe(
  		(data:Commentaire[]) => {this.commentaires = data}
  	);
  }
  supprimerComm(id: number)
  {
    let user = JSON.parse(localStorage.getItem('user'));
  let publication = JSON.parse(localStorage.getItem('publication'));


  
  let options = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  };
    console.log("suppppppppppppppppppppppppppppp supprimé");
   
  let conf = confirm("Etes-vous sûr ?");
  if (conf )
  
  
    this.commService.supprimerPublication(id).subscribe({
      next:(data:any)=>{
        console.log("mchet");
        console.log(this.comm.commented_by);
        
        
                },
                error:(err:any)=>{
                  console.log("err")
                  console.log(err)
                  console.log(this.id)
        
                
                },
                complete:()=>{},
            
            })
   
   
            

  }
  OnLike(id:any){
    
   
    
    this.like.addlike(id,this.Likes).subscribe({
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

  OnDisLike(id:any){
    
   
    
    this.dis.addlike(id,this.dislike).subscribe({
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
  }}