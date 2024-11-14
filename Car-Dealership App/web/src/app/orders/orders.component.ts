import { Component, effect, signal } from '@angular/core';
import { Car } from '../../types/car.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from '../../services/cars.service';
import { Subscription, switchMap } from 'rxjs';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderFormComponent, CurrencyPipe, MatIcon,MatButtonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  
  car: Car | null
  isSuccess = signal(false)
  subscription = new Subscription()
  constructor(private route : ActivatedRoute, private carService: CarsService, private router: Router){
    effect(()=>{
      this.getCar()
      
    },{allowSignalWrites: true})
  }
  
  
  getCar(){
    this.subscription = this.route.params.pipe(
      switchMap(params=>this.carService.getCarByID(params['id'])),    
    ).subscribe((car)=>
     {if(car){
      this.car = car
     }}
    )
  }

 carDetails(id:string | undefined){
  this.router.navigate([`cars/${id}`])
 }

 closeMessage(){
  this.isSuccess.set(false)
  this.router.navigate(['/'])
 }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
