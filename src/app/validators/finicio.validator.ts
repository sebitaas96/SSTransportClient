import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[fInicioValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: fInicioValidtor, multi: true }
  ]
})
export class fInicioValidtor implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    console.log(control.value);
    let v = new Date(control.value); 
    console.log(v);
    if (v.getTime()< new Date().getTime()) {
      return { 'fechav': true, 'requiredValue': 'La fecha de inicio no puede ser inferior a la actual'}
    }
    else if(v.getTime() >= (new Date().getTime()+31536000000)){
      return { 'fechav': true, 'requiredValue': 'La fecha de inicio no puede ser superior a 1 año'}
    }
    return null;
  }
}