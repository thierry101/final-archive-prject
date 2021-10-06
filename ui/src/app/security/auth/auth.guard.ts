import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { foundToken } from 'src/shared/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  securityObject!:any;

  constructor(private router: Router) { 
    this.securityObject = foundToken(this.securityObject) //affectation des valeurs venant du token  pour les verification
  }

  canActivate(){
    if(this.securityObject['key']=="archiSoftware"){
      return true
    }
    else{
      this.router.navigate(["login"]).then(()=>{
        window.location.reload()
      })
    }
    return false
  }
  
}
