import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  keyForLocalStorage = 'formOrder';
  dataFromLocalStorage = localStorage.getItem(this.keyForLocalStorage);
  setFromOrder = this.dataFromLocalStorage ? JSON.parse(this.dataFromLocalStorage) : false;
  local: boolean = this.dataFromLocalStorage ? true : false;

  availableCities: Array<{[key: string]: string | number}> = [
    {city: 'Москва', code: 77},
    {city: 'Санкт-Петербург', code: 78},
    {city: 'Челябинск', code: 74},
    {city: 'Новосибирск', code: 54},
    {city: 'Владивосток', code: 25},
  ]

  formOrder: FormGroup = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(3), Validators.pattern]],
    phone: [ '', [Validators.required, Validators.pattern]],
    receiving: ['', Validators.required, ],
    adress: this.fb.group({
      city:  [{ value: '', disabled: true }, [Validators.required,]],
      street: [{ value: '', disabled: true }, [Validators.required,]],
      house: [{ value: '', disabled: true }, [Validators.required,]],
      flat: [{ value: '', disabled: true }, [Validators.required,]],
    }),
    payment: ['', Validators.required, ],
  }, {updateOn:'change'})

  get nameControl() {
    return this.formOrder.get('name')
  }

  get phoneControl() {
    return this.formOrder.get('phone')
  }

  get receivingControl() {
    return this.formOrder.get('receiving')
  }

  get adressControl() {
    return this.formOrder.get('adress')
  }

  get cityControl() {
    return this.adressControl?.get('city')
  }

  get streetControl() {
    return this.adressControl?.get('street')
  }

  get houseControl() {
    return this.adressControl?.get('house')
  }

  get flatControl() {
    return this.adressControl?.get('flat')
  }

  get paymentControl() {
    return this.formOrder.get('payment')
  }

   fieldsDisable(local?:boolean) {
    const cache = document.getElementById('cache')
    if (this.receivingControl?.value === 'shop' && !local) {
      this.adressControl?.disable();
      this.paymentControl?.patchValue('');
      cache?.removeAttribute("disabled");
    } else if (
      this.receivingControl?.value === 'delyvery' && !local) {
      this.adressControl?.enable();
      this.paymentControl?.patchValue('');
      cache?.setAttribute("disabled", "disabled");
    } else if (this.receivingControl?.value === 'shop' && local) {
      this.adressControl?.disable();
      cache?.removeAttribute("disabled");
    } else if (
      this.receivingControl?.value === 'delyvery' && local) {
      this.adressControl?.enable();
      cache?.setAttribute("disabled", "disabled");
    }

  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.nameControl?.patchValue(this.setFromOrder ? this.setFromOrder.name : '');
    this.phoneControl?.patchValue(this.setFromOrder ? this.setFromOrder.phone : '');
    this.receivingControl?.patchValue(this.setFromOrder ? this.setFromOrder.receiving : '');
    this.cityControl?.patchValue(this.setFromOrder ? this.setFromOrder.adress?.city : '');
    this.streetControl?.patchValue(this.setFromOrder ? this.setFromOrder.adress?.street : '');
    this.houseControl?.patchValue(this.setFromOrder ? this.setFromOrder.adress?.house : '');
    this.flatControl?.patchValue(this.setFromOrder ? this.setFromOrder.adress?.flat : '');
    this.paymentControl?.patchValue(this.setFromOrder ? this.setFromOrder.payment : '');

    this.fieldsDisable(this.local);

  }
  send = false

  setText(){
    let text;
    if (this.send === false) {text = "Оформить заказ";};
    if (this.send === true) {text = "Ваш заказ оформлен"};
    return text;
  }

  setColor(){
    let color;
    if (this.send === false) {color = "accent";};
    if (this.send === true) {color = "success"};
    return color;
  }

  sendForm(){
    if(this.formOrder.invalid) {
      console.log("Форма не валидна и не может быть отправлена"); return }
    if(this.formOrder.valid) {
      console.log("Форма прошла валидацию и отправлена:", this.formOrder.value);
      this.send = true; this.formOrder.disable(); return }
  }

  ngOnDestroy() {
    localStorage.setItem(this.keyForLocalStorage, JSON.stringify(this.formOrder.value));
  }

}
