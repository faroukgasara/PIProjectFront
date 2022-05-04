import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  question: string = '';
  answer:string='';
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router,public dialogRef: MatDialogRef<ChatbotComponent>,private UserHttp: UserService) { }

  ngOnInit(): void {
    
  }

  getAnswer(){
    this.UserHttp.getAnswer(this.question).subscribe(
  		(data) => {
        this.answer=data
      }
  	);
  }

  
  hide() {
    this.dialogRef.close();
  }

}
