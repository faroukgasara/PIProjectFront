import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserModel } from "src/app/model/user.model";
import { Router  , ActivatedRoute } from '@angular/router';
import { UserService } from "src/app/services/user.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UpdateprofileComponent } from "src/app/back/updateprofile/updateprofile.component";
@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html"
})
export class ProfilepageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  users: UserModel;
  form!: FormGroup;
  user = JSON.parse(localStorage.getItem('user'));
  constructor(private dialog :MatDialog ,private formBuilder: FormBuilder,private route: ActivatedRoute,private UserHttp: UserService) {}

  ngOnInit() {

    this.form = this.formBuilder.group({
      reason:new FormControl('',[Validators.required]),
      type:new FormControl('',[Validators.required]),
    });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    this.findByEmail();

  }


  findByEmail(){
    this.UserHttp.findByEmail(this.route.snapshot.params['email']).subscribe(
  		(data:UserModel) => {this.users = data;}
  	);
  }

  submit():void{
    this.UserHttp.addReport(this.route.snapshot.params['email'],this.user.email,this.form.get(['reason']).value,this.form.get(['type']).value).subscribe();
    this.form.reset()
  }
  
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  onCreate(us) {
    localStorage.setItem('update', JSON.stringify(us));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "80%";
    this.dialog.open(UpdateprofileComponent,dialogConfig);
  }
}
