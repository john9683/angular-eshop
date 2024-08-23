import { FormGroup, ValidationErrors } from "@angular/forms";

export function PasswordMatchValidator(form: FormGroup): ValidationErrors | null {
  const passwordField = form.controls['password']
  const passwordConfirmField = form.controls['passwordConfirm']

  if(!passwordField || !passwordConfirmField){return null}

  return passwordField.value !== passwordConfirmField.value ? {passwordMatch: true} : null

}
