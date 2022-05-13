/*

  constructor() { }

  ngOnInit(): void {
  }

}
*/
import { HttpHeaders } from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdvertisingService } from '../services/advertising.service';


@Component({
  selector: 'app-targetedgroups',
  templateUrl: './targetedgroups.component.html',
  styleUrls: ['./targetedgroups.component.scss']
})
export class TargetedgroupsComponent implements OnInit {
  Likes:any={}
  token = localStorage.getItem('token');
  ads=  localStorage.getItem('vaze');
  id:any;
 
  constructor(

    private dialog: MatDialog,
    private service: AdvertisingService,
   // private commService:Service,
    private dialogRef: MatDialogRef<TargetedgroupsComponent>,
    @Inject(MAT_DIALOG_DATA)  private data: any
  ) { }

  ngOnInit(): void {
  ///  this.commService.getComm(this.data.id).subscribe(data => {
     // this.commentaires =data;
   // })
  }

  getUsers(){
   // this.commService.getUsers().subscribe(
  	//	(data:Commentaire[]) => {this.commentaires = data}
  	//);
  }
}