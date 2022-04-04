import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[telefonoValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: telefonoValidatorDirective, multi: true }
  ]
})
export class telefonoValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    let v:string = control.value;
    let telefono = /^[6789]{1}\d{8}$/

    if (v =='') {
      return { 'telefonov': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(!telefono.test(v)){
      return { 'telefonov': true, 'requiredValue': 'El formato no es correcto'}
    }
 
    return null;
  }
}