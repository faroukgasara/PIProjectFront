import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notificationuserfront',
  templateUrl: './notificationuserfront.component.html',
  styleUrls: ['./notificationuserfront.component.scss']
})
export class NotificationuserfrontComponent implements OnInit {

  users: UserModel[];
  notification:any ; 
  constructor(public dialogRef: MatDialogRef<NotificationuserfrontComponent>,private UserHttp: UserService) { }

  ngOnInit(): void {
    this.UserHttp.getNotif().subscribe(
  		(data) => { this.notification=data;}
  	);



  }


  hide() {
    this.dialogRef.close();
  }

}
