import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[swiftBicValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: swiftBicValidatorDirective, multi: true }
  ]
})
export class swiftBicValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    let siwftBic = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/
   
    /*SWIFTBIC : 6 letras + 2 letras o 2 digitos + 3 letras o digitos opcionales'*/

    if (v =='') {
      return { 'swiftbicv': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(!siwftBic.test(v)){
      return { 'swiftbicv': true, 'requiredValue': 'El formato no es correcto'}
    }
 
    return null;
  }
}