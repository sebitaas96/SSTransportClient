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
    let v:string = control.value;
    let num = /^\d{2}$/
    let cero = /^0$/

    if (v =='') {
      return { 'numerov': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(cero.test(v)){
      return { 'numerov': true, 'requiredValue': 'el numero no puede ser 0'}  
    }
    if(!num.test(v)){
      return { 'numerov': true, 'requiredValue': 'el numero no puede ser mayor a 99'}
    }
 
    return null;
  }
}