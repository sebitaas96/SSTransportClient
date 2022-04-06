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
    this.realRol = this.tokenService.getIsTransporte() ? 'transporte':'';
    if (!this.tokenService.isLogged || expectedRol.indexOf(this.realRol) <0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
