import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[passwordValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: passwordValidatorDirective, multi: true }
  ]
})
export class passwordValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    let v:string = control.value;
    let patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,18}$/;

/*
At least 8 characters in length
Lowercase letters
Uppercase letters
Numbers
Special characters
*/

    if (v =='') {
      return { 'passwordv': true, 'requiredValue': 'El campo esta vacio' }
    }
    if(v.length<8){
        return { 'passwordv': true, 'requiredValue': 'Debe contener mas de 8 caracteres' }
    }
    if(v.length>18){
        return { 'passwordv': true, 'requiredValue': 'No debe tener mas de 18 caracteres' }
    }
    if(!patron.test(v)){
      return { 'passwordv': true, 'requiredValue': 'Debe contener caracteres numericos , mayusculas y minusculas , especial'}
    }
 
    return null;
  }
}