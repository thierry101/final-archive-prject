import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { foundToken } from 'src/shared/shared';

@Injectable({
  providedIn: 'root'
})
export class Auth1Guard implements CanActivate {
  securityObject!:any;
  
  constructor(private auth:AuthService, private router: Router) { 
    this.securityObject = foundToken(this.securityObject) //affectation des valeurs venant du token  pour les verification
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(!this.securityObject){
       // this.router.navigate(["archive/show-all"]).then(()=>{
      //   window.location.reload()
      // })
      return true
    }
    else{
      return false
    }
  }
  
}
