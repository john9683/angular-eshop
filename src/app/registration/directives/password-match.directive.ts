import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { PasswordMatchValidator } from '../validators/passwordMatch.validator';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    }
  ]
})
export class PasswordMatchDirective implements Validator{

  validate(formGroup: FormGroup): ValidationErrors | null {
     return PasswordMatchValidator(formGroup)
  }

  constructor() { }

}
