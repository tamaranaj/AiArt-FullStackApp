import { Component, inject } from '@angular/core';
import { Car } from '../../types/car.interface';
import { CarsService } from '../../services/cars.service';
import {MatTableModule} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { AppStore } from '../../store/app.store';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MatTableModule, MatButton,MatIconModule, CurrencyPipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  appStore= inject(AppStore)
  displayedColumns: string[] = ['Brand', 'Model', 'Year', 'Price', 'Location','Make order','Remove'];
  constructor(private router: Router){}
 handleRemoveFromList(car:Car){
  console.log(car)
  this.appStore.removeFromFavorites(car)
  console.log(this.appStore.favoriteCars())
 }
 navigateItem(car: Car){
  
  this.router.navigate([`shopping/cars/${car.id}`])
 }

 goBack(){
  this.router.navigate(['/'])
 }
 goToOrders(id: string){
  this.router.navigate([`orders/${id}`])
 }
}
