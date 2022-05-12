import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationuserComponent } from './notificationuser/notificationuser.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  user = JSON.parse(localStorage.getItem('user')).firstName;
  user1 = JSON.parse(localStorage.getItem('user')).lastName;
  fistName:any;

  public associationName:boolean = false ;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


    menuItems = ['dashboard','userManagement', 'reporting', 'blacklist', 'fakeaccounts'];
    menuItem = ['dashboard','user Management', 'reporting', 'blacklist', 'fake accounts'];
  constructor(private dialog :MatDialog ,private breakpointObserver: BreakpointObserver,private router:Router) {}


  logout(){
    localStorage.clear();
    this.router.navigate(['/login']).then(()=>{
      location.reload() ;
    })
  }

  ngOnInit(): void {
    this.fistName=this.user+" "+this.user1;

  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "30%";
    this.dialog.open(NotificationuserComponent,dialogConfig);
  }

}
