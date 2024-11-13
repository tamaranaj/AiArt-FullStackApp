import { Component, inject, input, output, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AppStore } from '../../../../store/app.store';
import { CarsService } from '../../../../services/cars.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule, MatIconModule,MatFormFieldModule,MatButtonModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  appStore = inject(AppStore)
  carID = input.required<string | undefined>()
  orderForm: FormGroup
  subscription: Subscription
  successOrder = output<boolean>()
  constructor(private carService: CarsService){}
  ngOnInit(){
    this.orderForm = new FormGroup({
      fullName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z]{3,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/)]),
      email: new FormControl(this.appStore.userEmail(), [Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9,13}$/)]),
      card: new FormControl('', [Validators.required,Validators.minLength(16), Validators.maxLength(16),Validators.pattern(/^[0-9]\d*$/)]),
      expireDate: new FormControl('', [Validators.required, Validators.pattern(/^(11|12)\/24$|^(0[1-9]|10|11|12)\/2[5-9]$/)]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]),
    })
  }

  submitForm(){
    console.log(this.orderForm.value)
    if(this.orderForm.invalid){
      return
    }
    this.subscription = this.carService.makeOrder({carId:this.carID()}).subscribe(res=>
    {
      if(res && res.id){
        this.successOrder.emit(true)
        return
      }
      this.successOrder.emit(false)
    }
    )
  }
}
