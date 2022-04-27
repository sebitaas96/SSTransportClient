import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[localidadValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: localidadValidatorDirective, multi: true }
  ]
})
export class localidadValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    

    if (v =='') {
      return { 'localidadv': true, 'requiredValue': 'Seleccione una localidad' }
    }
 
    return null;
  }
}