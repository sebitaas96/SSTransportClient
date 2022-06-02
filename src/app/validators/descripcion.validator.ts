import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[descripcionValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: descripcionValidatorDirective, multi: true }
  ]
})
export class descripcionValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    let patron1 = /^[a-zA-ZÁÉÍÓÚáéíóúüÜñçÇÑ]{2}$/
    let patron2 = /^[a-zA-ZÁÉÍÓÚáéíóúüÜñçÇÑ]{2}[a-zA-ZÁÉÍÓÚáéíóúüÜñçÇÑ\- ]{1,38}$/;

    if (v =='') {
      return { 'descripcionv': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(v.length<5){
      return { 'descripcionv': true, 'requiredValue': 'La descripcion no puede tener menos de 5 caracteres' }
    }
    if(v.length>200){
      return { 'descripcionv': true, 'requiredValue': 'La descripcion no puede tener mas de 200 caracteres' }
    }
    if(!patron1.test(v.substring(0,2))){
      return{'descripcionv': true, 'requiredValue': 'La descripcion tiene que comenzar con 2 letras'}
    }
    if(!patron2.test(v)){
      return{'descripcionv': true, 'requiredValue': 'Caracteres no permitidos'}
    }
 
    return null;
  }
}