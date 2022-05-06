import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[matriculaRemolqueValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: matriculaRemolqueValidatorDirective, multi: true }
  ]
})
export class matriculaRemolqueValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    let patron = /^[R]{1}[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$/

    if (v =='') {
      return { 'matriculaRemolquev': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(!patron.test(v)){
      return { 'matriculaRemolquev': true, 'requiredValue': 'El formato no es correcto'}
    }
 
    return null;
  }
}
