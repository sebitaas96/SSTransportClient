import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { addCuenta } from 'src/app/dto/addCuenta';
import { CuentaBancaria } from 'src/app/models/cuenta-bancaria';
import { CuentaBancariaService } from 'src/app/services/cuenta-bancaria.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService} from 'src/app/services/notificacion.service'; 
import { GravedadService} from 'src/app/services/gravedad.service'; 
import {NuevaNotificacion} from 'src/app/dto/nuevaNotificacion';
import { Gravedad } from 'src/app/models/gravedad';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'cuenta-bancaria',
  templateUrl: './cuenta-bancaria.component.html',
  styleUrls: ['./cuenta-bancaria.component.css']
})
export class CuentaBancariaComponent implements OnInit {
  cuenta$!: Observable<CuentaBancaria>;
  refreshCuenta$ = new BehaviorSubject<boolean>(true);

  //Notificaciones
  gravedad$!:Gravedad[];
  usuario$!:Usuario;
  
  constructor(private usuarioService: UsuarioService,
    private cuentaBancariaService: CuentaBancariaService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private notificacionService:NotificacionService,
    private gravedadService:GravedadService
    ) { 
    }

  ngOnInit(): void {
    this.refresh();
    this.gravedadService.findAll().subscribe(
      data=>{
        this.gravedad$ = data;
      }
    )
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
                          //Notificacion
        var notificacion = new NuevaNotificacion("Cuenta bancaria añadida" , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();

        this.toastr.success('Cuenta bancaria añadida!', 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
                  this.refresh();
                  
                },
                err => {
                          //Notificacion
                          var notificacion = new NuevaNotificacion("Ha habiado un error añadiendo la cuenta bancaria" , new Date(),this.usuario$.id, this.gravedad$[2].id);
                          this.notificacionService.addNotificacion(notificacion).subscribe();
                  
                          this.toastr.success('Ha sucedido un error!', 'Notificación',{
                            progressBar:true,
                            timeOut: 3000,
                            easing:'ease-in',
                            easeTime:300
                          });
                }
              )
            })
          }
        )
      },
      err=>{

      }
    )
  }

  onUCuenta(cuentaBancaria: CuentaBancaria) {
    this.cuentaBancariaService.updateCuenta(cuentaBancaria).subscribe(
      data=>{
        this.refreshCuenta$.next(true);
        //Notificacion
        var notificacion = new NuevaNotificacion("Cuenta bancaria actualizada" , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();

        this.toastr.success('Cuenta bancaria actualizada!', 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      },
      err=>{
        var notificacion = new NuevaNotificacion("Ha sucedido un error actualizando la cuenta bancaria" , new Date(),this.usuario$.id, this.gravedad$[2].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
        this.toastr.error('Ha sucedido un error!', 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      }
    )

  }

  refresh(){
    this.usuarioService.findUsuario(this.tokenService.getUserName()).subscribe(
      data => {
        this.usuario$ = data;
        if (data["cuentaBancaria"] != null) {
          this.cuenta$ = this.refreshCuenta$.pipe(switchMap(_ => this.cuentaBancariaService.findCuenta(data["cuentaBancaria"]!["id"])));
        }
      });
  }

}
