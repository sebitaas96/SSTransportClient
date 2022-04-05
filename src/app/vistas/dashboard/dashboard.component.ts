import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLogged:boolean;

  constructor(private tokenService:TokenService) {
    this.isLogged = false;
   }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
  }

}
