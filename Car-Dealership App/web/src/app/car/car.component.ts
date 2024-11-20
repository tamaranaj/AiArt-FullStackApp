import { Component, inject, input, signal } from '@angular/core';
import { Car } from '../../types/car.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { CurrencyPipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { Router, RouterLink } from '@angular/router';
import { AppStore } from '../../store/app.store';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-car',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, CurrencyPipe, MatIconModule,MatDividerModule, MatExpansionModule,MatChipsModule, RouterLink],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  appStore = inject(AppStore)
  constructor(private notificationService: NotificationService, private router: Router){}
  car=input.required<Car>()
  readonly panelOpenState = signal(false); 

  handleAccordion(value:boolean){
    this.panelOpenState.set(value)
  }
  handleAddFavorites(car:Car){
    let check = this.appStore.setFavoriteCars(car)
      if(check){
        this.notificationService.openSnackBar('Item is added in favorites list!')
      }else{
        this.notificationService.openSnackBar('Item is already in favorites list!')
      }
  }
  goToOrders(id: string){
    this.router.navigate([`orders/${id}`])  
  }
  navigateDetails(id:string){
    this.router.navigate([`shopping/cars/${ id }`])
  }
}

