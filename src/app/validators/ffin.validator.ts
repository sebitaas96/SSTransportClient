import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[fFinValidtor]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: fFinValidtor, multi: true }
  ]
})
export class fFinValidtor implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(control: FormControl) {
    if (control.value == null) { return null}
    console.log(control);
    let v = new Date(control.value); 
    console.log(v);
    if(v.getTime() >= (new Date().getTime()+31536000000)){
      return { 'fechav': true, 'requiredValue': 'La fecha de fin no puede ser superior a 1 año'}
    }
    return null;
  }
}