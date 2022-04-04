import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[prefijoValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: prefijoValidatorDirective, multi: true }
  ]
})
export class prefijoValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    let v:string = control.value;
    

    if (v =='') {
      return { 'prefijov': true, 'requiredValue': 'Seleccione un prefijo' }
    }
 
    return null;
  }
}