import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[tipoCamionValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: tipoCamionValidatorDirective, multi: true }
  ]
})
export class tipoCamionValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    

    if (v =='') {
      return { 'tipoCamionv': true, 'requiredValue': 'Seleccione un tipo de camion' }
    }
 
    return null;
  }
}