import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[numeroValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: numeroValidatorDirective, multi: true }
  ]
})
export class numeroValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;

    let cero = /^0$/
    let ceros = /^0\d*$/

    if (v =='') {
      return { 'numerov': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(cero.test(v) ||ceros.test(v)){
      return { 'numerov': true, 'requiredValue': 'el numero no empezar por 0'}  
    }
    if(parseInt(v)>999){
      return { 'numerov': true, 'requiredValue': 'el numero no puede ser mayor a 999'}
    }
 
    return null;
  }
}