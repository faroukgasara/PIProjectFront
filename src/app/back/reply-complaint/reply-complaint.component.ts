import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Complaint } from 'src/app/model/complaint';
import { ComplaintService } from 'src/app/services/complaint.service';
import {ReplyComplaint} from'src/app/model/reply-complaint'
@Component({
  selector: 'app-reply-complaint',
  templateUrl: './reply-complaint.component.html',
  styleUrls: ['./reply-complaint.component.scss']
})
export class ReplyComplaintComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,public dialogRef: MatDialogRef<ReplyComplaintComponent>,private complaintreplyHttp: ComplaintService) { }
  form!: FormGroup;
  replyComplaint: ReplyComplaint=new ReplyComplaint();
  complaints:Complaint[];
  complaint: Complaint = new Complaint();
  type:any;
  p:number = 1 ;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      message:this.replyComplaint.message ,});
  }
   

  submit() : void{
    let token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    
    this.http.post('http://localhost:8080/WomenEmpowerment/ReponseRec/add/'+localStorage.getItem('update') ,options)
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      window.location.reload();
      console.log("error")
      
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
  }
  getComplaints(){
    this.complaintreplyHttp.getComplaints().subscribe(
  		(data:Complaint[]) => {this.complaints = data}
  	);
  }
  Search(){
    if(this.type==""){
      this.ngOnInit();
    }else{
      this.complaints = this.complaints.filter(res=>{
        return res.type.toLocaleLowerCase().match(this.type.toLocaleLowerCase());
      })
    }
  }
  key:string='id';
  reverse:boolean = false;
  Sort(key){
    this.key = key
    this.reverse = !this.reverse;
  }

  hide() {
    this.dialogRef.close();
  }
}
