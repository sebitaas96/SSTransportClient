import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'pantalla-info',
  templateUrl: './pantalla-info.component.html',
  styleUrls: ['./pantalla-info.component.css']
})
export class PantallaInfoComponent implements OnInit {

  constructor(private tokenService:TokenService) { }

  ngOnInit(): void {
    this.tokenService.logOut();
  }

}
