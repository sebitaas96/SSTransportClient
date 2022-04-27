import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[nombreUsuarioValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: nombreUsuarioValidatorDirective, multi: true }
  ]
})
export class nombreUsuarioValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    let patron = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    /*
      --Patron entre 8 y 20 caracteres
      --No acepta - o . al principio
      --no acepta __ o _. o ._ o -- dentro 
      --Acepta caracteres , mayusculas , minusculas y numeros 
      --no acepta . al final
    */

    if (v =='') {
      return { 'nombreUsuariov': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(v.length<8){
      return { 'nombreUsuariov': true, 'requiredValue': 'El nombre de Usuario no puede tener menos de 8 caracteres' }
    }
    if(v.length>20){
      return { 'nombreUsuariov': true, 'requiredValue': 'El nombre  de Usuario no puede tener mas de 20 caracteres' }
    }
    if(!patron.test(v)){
      return{'nombreUsuariov': true, 'requiredValue': 'Formato incorrecto'}
    }
 
    return null;
  }
}