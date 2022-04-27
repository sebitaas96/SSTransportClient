import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
  realRol: string;

  constructor(private tokenService:TokenService , 
    private router:Router
    ) { 
      this.realRol = "";
    }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    
    if(this.tokenService.getIsTransporte()){
      this.realRol = 'transporte';
    }
    else if(this.tokenService.getIsPorte()){
      this.realRol = 'porte'
    }
    else if(this.tokenService.getIsConductor()){
      this.realRol = 'conductor'
    }
    else{
      this.realRol = '';
    }

    if (!this.tokenService.isLogged || expectedRol.indexOf(this.realRol) <0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
