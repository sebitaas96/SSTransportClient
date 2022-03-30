import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[nombreValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: nombreValidatorDirective, multi: true }
  ]
})
export class nombreValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    let v:string = control.value;
    let patron1 = /^[a-zA-ZÁÉÍÓÚáéíóúüÜñçÇÑ]{2}$/
    let patron2 = /^[a-zA-ZÁÉÍÓÚáéíóúüÜñçÇÑ]{2}[a-zA-ZÁÉÍÓÚáéíóúüÜñçÇÑ\- ]{1,38}$/;

    if (v =='') {
      return { 'nombrev': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(v.length<3){
      return { 'nombrev': true, 'requiredValue': 'El nombre no puede tener menos de 3 caracteres' }
    }
    if(v.length>40){
      return { 'nombrev': true, 'requiredValue': 'El nombre no puede tener mas de 40 caracteres' }
    }
    if(!patron1.test(v.substring(0,2))){
      return{'nombrev': true, 'requiredValue': 'El nombre tiene que comenzar con 2 letras'}
    }
    if(!patron2.test(v)){
      return{'nombrev': true, 'requiredValue': 'Caracteres no permitidos'}
    }
 
    return null;
  }
}