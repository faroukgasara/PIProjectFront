import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  
  constructor(private router:Router) { }

  user = JSON.parse(localStorage.getItem('user'));
  token = localStorage.getItem('token');
  //console.log(user.appUserRole);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthorized = false;
    let token = localStorage.getItem('token');

    if(token==null || this.user.appUserRole==null){
      window.alert("not login")  
      this.router.navigate(['/login'])
      return false;
    }

    route.data.appUserRole.forEach(role=>{
      //window.alert(role)
      if(this.user.appUserRole
        .includes(role)){
          isAuthorized = true;
      }
    })

    

    

    if(!isAuthorized){
      //redirect
      //display
      window.alert("not auth")  
      this.router.navigate(['/home'])
    }
    
    
    return isAuthorized;
  }
  
}
