import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[direccionValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: direccionValidatorDirective, multi: true }
  ]
})
export class direccionValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    let v:string = control.value;
    let patron = /^[a-zA-ZÁÉÍÓÚáéíóúüÜñçÇÑ\- ]{3,100}$/;

    if (v =='') {
      return { 'direccionv': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(v.length<3){
      return { 'direccionv': true, 'requiredValue': 'la diección no puede tener menos de 3 caracteres' }
    }
    if(v.length>40){
      return { 'direccionv': true, 'requiredValue': 'la dirección no puede tener más de 100 caracteres' }
    }
    if(!patron.test(v)){
      return{'direccionv': true, 'requiredValue': 'Caracteres no permitidos'}
    }
 
    return null;
  }
}