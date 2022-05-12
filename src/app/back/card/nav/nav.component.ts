import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  public associationName:boolean = false ;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    menuItems = ['dashboard','userManagement', 'reporting', 'blacklist', 'fakeaccounts','complaint','advertising'];
    menuItem = ['dashboard','user Management', 'reporting', 'blacklist', 'fake accounts','complaint','advertising'];
  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {}

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']).then(()=>{
      location.reload() ;
    })
  }

}
