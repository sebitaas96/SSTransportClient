import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[rolValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: rolValidatorDirective, multi: true }
  ]
})
export class rolValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    let v:string = control.value;
    

    if (v =='') {
      return { 'rolv': true, 'requiredValue': 'Seleccione un tipo de empresa' }
    }
 
    return null;
  }
}