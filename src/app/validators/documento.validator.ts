import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[documentoValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: documentoValidatorDirective, multi: true }
  ]
})
export class documentoValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    let NIE = /^[XYZxyz]{1}\d{7}[A-Za-z]{1}$/
    let DNI = /^\d{8}[A-Za-z]{1}$/
    let CIF = /^[ABCFabcf]{1}\d{7}[A-Za-z]{1}$/
    /*DNI: 8 números + Letra de Control\n NIE: [XYZ] + 7 números + Letra de Control\nCIF: [ABCF] + 7 números + Letra de control'*/

    if (v =='') {
      return { 'documentov': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(!NIE.test(v) && !DNI.test(v) && !CIF.test(v)){
      return { 'documentov': true, 'requiredValue': 'El formato no es correcto'}
    }
 
    return null;
  }
}