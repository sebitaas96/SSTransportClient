
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';



@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: string[] = [];

  constructor(private router:Router) {
    
  }


  public setToken(token:string):void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem( TOKEN_KEY , token);
    window.sessionStorage.setItem(TOKEN_KEY , token)
  }

  public getToken():string{
    return localStorage.getItem(TOKEN_KEY)! //!;
  }

  public isLogged():boolean{
    if(this.getToken()){
      return true;
    }
    return false;
  }


  public getUserName():string{
    if(!this.isLogged()){
      return "";
    }
    const token = this.getToken();
    const payload = token.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;
    return username;
  }

  public getIsTransporte():boolean{
    if(!this.isLogged()){
      return false;
    }
    const token = this.getToken();
    const payload = token.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if(roles.indexOf('ROLE_TRANSPORTE')<0){
      return false;
    }
    return true;
  }



  public logOut():void{
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}
