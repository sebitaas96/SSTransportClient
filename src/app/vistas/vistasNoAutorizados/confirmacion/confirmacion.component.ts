import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

  constructor(
    private route:ActivatedRoute , 
    private usuarioService:UsuarioService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.route.queryParams
    .subscribe(params => {
     var idUsuario = params['q'];
     console.log(idUsuario);
     this.usuarioService.activarUsuario(idUsuario).subscribe(
      data=>{
        console.log("ACTIVED");
      }
     )
    });


  }

}
