import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[checkboxValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: checkboxValidatorDirective, multi: true }
  ]
})
export class checkboxValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    

    if (v =='') {
      return { 'isAcceptv': true, 'requiredValue': 'Términos y condiciones no aceptados' }
    }
 
    return null;
  }
}