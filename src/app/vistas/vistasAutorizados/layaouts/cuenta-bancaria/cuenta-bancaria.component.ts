import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { addCuenta } from 'src/app/dto/addCuenta';
import { CuentaBancaria } from 'src/app/models/cuenta-bancaria';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'cuenta-bancaria',
  templateUrl: './cuenta-bancaria.component.html',
  styleUrls: ['./cuenta-bancaria.component.css']
})
export class CuentaBancariaComponent implements OnInit {
  cuenta$!: Observable<CuentaBancaria>;
  refreshCuenta$ = new BehaviorSubject<boolean>(true);
  
  //Creacion
  cuentaCreada:boolean;
  cuentaNoCreada:boolean;
  errMsjC:string;

  //Actualizacion
  cuentaActualizada:boolean;
  cuentaNoActualizada:boolean;
  errMsj:string;

  constructor(private usuarioService: UsuarioService,
    private cuentaBancariaService: CuentaBancariaService,
    private tokenService: TokenService) { 
      this.cuentaActualizada = false;
      this.cuentaNoActualizada = false;
      this.errMsj = "";
      this.cuentaCreada = false;
      this.cuentaNoCreada = false;
      this.errMsjC = "";
    }

  ngOnInit(): void {
    this.refresh();
  }

  onCCuenta(dataForm: any) {
    var cuenta: CuentaBancaria = new CuentaBancaria(0, dataForm["nombreTitular"], dataForm["swiftbic"], dataForm["numIban"] , null);
    this.cuentaBancariaService.createCuenta(cuenta).subscribe(
      data => {
        var cuentaCreada: CuentaBancaria;

        this.cuentaBancariaService.findCuentaIban(cuenta.iban).subscribe(
          data=>{
            cuentaCreada = data;
            this.usuarioService.findUsuario(this.tokenService.getUserName()).subscribe(data => {
              var addCuentadto: addCuenta = new addCuenta(cuentaCreada, data["id"]);
              this.usuarioService.addCuenta(addCuentadto).subscribe(
                data => {
                  this.refresh();
                  this.cuentaCreada = true;
                  this.cuentaNoCreada = false;
                  this.errMsjC = data["mensaje"];
                },
                err => {
                  this.cuentaCreada = false;
                  this.cuentaNoCreada = true;
                  this.errMsjC = err['error']['mensaje'];
                }
              )
            })
          }
        )
      },
      err=>{
        this.cuentaCreada = false;
        this.cuentaNoCreada = true;
        this.errMsjC = err['error']['mensaje'];
      }
    )
  }

  onUCuenta(cuentaBancaria: CuentaBancaria) {
    this.cuentaBancariaService.updateCuenta(cuentaBancaria).subscribe(
      data=>{
        this.refreshCuenta$.next(true);
        this.cuentaActualizada = true;
        this.cuentaNoActualizada = false;
        this.errMsj = data["mensaje"];
      },
      err=>{
        this.cuentaActualizada = false;
        this.cuentaNoActualizada = true;
        this.errMsj = err['error']['mensaje'];
      }
    )

  }

  refresh(){
    this.usuarioService.findUsuario(this.tokenService.getUserName()).subscribe(
      data => {
        if (data["cuentaBancaria"] != null) {
          this.cuenta$ = this.refreshCuenta$.pipe(switchMap(_ => this.cuentaBancariaService.findCuenta(data["cuentaBancaria"]!["id"])));
        }
      });
  }

}
