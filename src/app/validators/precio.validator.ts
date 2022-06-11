import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[precioValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: precioValidatorDirective, multi: true }
  ]
})
export class precioValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    let patron1 = /^[123456789]{1}[\d]*$/

    if(!patron1.test(v) && v!=""){
      return{'preciov': true, 'requiredValue': 'Valor inválido'}
    }

    return null;
  }
}