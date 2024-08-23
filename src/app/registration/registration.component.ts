import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  addEmail = false;

  user ={
    name: '',
    email: '',
    emailReserve: '',
    password: '',
    passwordConfirm: '',
  }

  addReserveEmail(checkboxValue: boolean): void {
    this.addEmail = checkboxValue
  }

  send = false

  setText(){
    let text;
    if (this.send === false) {text = "Зарегистрироваться";};
    if (this.send === true) {text = "Вы успешно прошли решистрацию"};
    return text;
  }

  setColor(){
    let color;
    if (this.send === false) {color = "accent";};
    if (this.send === true) {color = "success"};
    return color;
  }

  sendForm(form: NgForm): void {
    if(form.invalid) { console.log("форма не валидна"); return }
    if(form.valid) { console.log("форма прошла валидацию и отправлена:", form.value);  this.send = true; form.reset(); return }

  }

  constructor() {}

  ngOnInit(): void {
  }

}
