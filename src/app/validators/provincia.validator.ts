import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[provinciaValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: provinciaValidatorDirective, multi: true }
  ]
})
export class provinciaValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    

    if (v =='') {
      return { 'provinciav': true, 'requiredValue': 'Seleccione una provincia' }
    }
 
    return null;
  }
}