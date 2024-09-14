import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";



@Directive({
  selector : "[passwordStrength]",
  providers : [{
    provide : NG_VALIDATORS,
    useExisting : PasswordStrengthDirective,
    multi : true
  }]
  //to tell angular that it is a form field validator

})

export class PasswordStrengthDirective implements Validator {
  validate(control : AbstractControl) : ValidationErrors | null {
    return createPasswordStrengthValidator()(control);
  }
}
