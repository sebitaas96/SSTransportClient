import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  nombreUsuario:string;
  isLogged:boolean;

  constructor(private tokenService:TokenService, private router:Router) { 
    this.nombreUsuario = "";
    this.isLogged = false;
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.nombreUsuario = this.tokenService.getUserName();
      this.isLogged = true;
    }
    
  }

  logOut(){
    this.tokenService.logOut();
    this.router.navigate(['/ptprincipal']);
  }

}
