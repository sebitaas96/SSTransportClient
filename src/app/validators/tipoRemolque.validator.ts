import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[tipoRemolqueValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: tipoRemolqueValidatorDirective, multi: true }
  ]
})
export class tipoRemolqueValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    

    if (v =='') {
      return { 'tipoRemolquev': true, 'requiredValue': 'Seleccione un tipo de remolque' }
    }
 
    return null;
  }
}