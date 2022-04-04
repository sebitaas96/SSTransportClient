import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[tipoviaValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: tipoviaValidatorDirective, multi: true }
  ]
})
export class tipoviaValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    let v:string = control.value;
    

    if (v =='') {
      return { 'tipoviav': true, 'requiredValue': 'Seleccione una tipo de via' }
    }
 
    return null;
  }
}