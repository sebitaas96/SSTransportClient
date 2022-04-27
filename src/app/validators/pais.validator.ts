import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[paisValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: paisValidatorDirective, multi: true }
  ]
})
export class paisValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    

    if (v =='') {
      return { 'paisv': true, 'requiredValue': 'Seleccione un pais' }
    }
 
    return null;
  }
}