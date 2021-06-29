import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router,
    private snackBar: MatSnackBar,){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if(!this.loginService.isLoggedIn())
      {
        return true;
      }
      else
      {
        this.snackBar.open("You have to logout first","Close",{duration: 2000});
        return false;
      }

  }


}
