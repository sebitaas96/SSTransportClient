import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLogged = false;

  constructor(private tokenService:TokenService) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
  }

}
