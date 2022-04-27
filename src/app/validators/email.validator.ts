import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[emailValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: emailValidatorDirective, multi: true }
  ]
})
export class emailValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    let patron = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (v =='') {
      return { 'emailv': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(!patron.test(v)){
      return { 'emailv': true, 'requiredValue': 'El formato no es correcto'}
    }
 
    return null;
  }
}