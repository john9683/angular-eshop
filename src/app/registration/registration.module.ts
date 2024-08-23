import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { ButtonModule } from 'src/app/button/button.module';
import { FormsModule } from '@angular/forms';
import { PasswordMatchDirective } from './directives/password-match.directive';

@NgModule({
  declarations: [RegistrationComponent, PasswordMatchDirective],
  imports: [CommonModule, FormsModule, ButtonModule],
  exports: [RegistrationComponent],
})
export class RegistrationModule { }
