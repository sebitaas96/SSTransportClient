import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[tipoEmpresalValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: tipoEmpresaValidatorDirective, multi: true }
  ]
})
export class tipoEmpresaValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    

    if (v =='') {
      return { 'tipoEmpresav': true, 'requiredValue': 'Seleccione un tipo de empresa' }
    }
 
    return null;
  }
}