import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/models/direccion';
import { Localidad } from 'src/app/models/localidad';
import { Pais } from 'src/app/models/pais';
import { PaisService } from '../../services/pais.service';
import { Provincia } from 'src/app/models/provincia';
import { ProvinciaService } from '../../services/provincia.service';
import { Transporte } from 'src/app/models/transporte';
import { Usuario } from 'src/app/models/usuario';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilEmpresa:Transporte;
  paises:Pais[];
  provincias:Provincia[];
  localidades:Localidad[];
  cp:string;

  constructor(private usuarioService: UsuarioService , private tokenService:TokenService, private paisService:PaisService,
    private provinciaService:ProvinciaService,) { 
    /*Inicializamos los selects*/
    this.paises = [];
    this.provincias = [];
    this.localidades = [];
    this.cp = "";

    this.perfilEmpresa = new Transporte(0,"","","","","","",new Direccion(0,"","",0,new Localidad(0,"",0,new Provincia(0,"",new Pais(0,"")))),new Provincia(0,"",new Pais(0,"")),null);
  }

  ngOnInit(): void {
     //Iniciamos los paises
     this.paisService.findAll().subscribe(data=>{
      this.paises = data;
    })

    this.usuarioService.findEmpresaTransprte(this.tokenService.getUserName()).subscribe(data=>{
      this.perfilEmpresa = data;
      console.log(this.perfilEmpresa);
    })
  }

  /*
  onSubmit(data:any):void{
   console.log(data);
   if(data['descripcion']!=""){
     this.descripcionModal = data['descripcion']
   }
   console.log(perfilEmpresa);
 }*/



/*Renew de los selects*/
renewProvincias(pais:any){
  if(pais != ""){
    this.paisService.findProvincias(pais.id).subscribe(data=>{
      this.provincias = data;
      if(this.provincias.length>0){
        this.renewLocalidades(data[0]);
      }
      else{
        this.localidades = [];
      }
    })
  }
  else{
    this.provincias = [];
    this.localidades = [];
  }
}

renewLocalidades(provincia:any){
  if(provincia !=""){
    this.provinciaService.findLocalidades(provincia.id).subscribe(data=>{
      this.localidades = data;
    });
  }
  else{
    this.localidades = [];
  }

}

renewCp(localidad:any){
  this.cp = localidad.cp;
}


}
