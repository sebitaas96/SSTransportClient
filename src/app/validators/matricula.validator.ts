import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[matriculaValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: matriculaValidatorDirective, multi: true }
  ]
})
export class matriculaValidatorDirective implements Validator, OnInit {

  ngOnInit() {
  }
 
  validate(control: FormControl) {
    console.log("aqui");
    if (control.value == null) { return null}
    let v:string = control.value;
    let patron = /^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$/

    if (v =='') {
      return { 'matriculav': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(!patron.test(v)){
      return { 'matriculav': true, 'requiredValue': 'El formato no es correcto'}
    }
 
    return null;
  }
}