import { Component, inject, signal } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Subscription, } from 'rxjs';
import { SearchQueryParams } from '../../types/searchQueryParams';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarBrands } from '../../types/enums/car-brands.enum';
import { CarTypes } from '../../types/enums/car-types.enum';
import { FuelType } from '../../types/enums/fuel-type.enum';
import { PopularCarsComponent } from '../popular-cars/popular-cars.component';
import { Car } from '../../types/car.interface';
import { TrendingComponent } from '../trending/trending.component';
import { SortDirection } from '../../types/enums/sortDirection.enum';
import { AdvComponent } from '../adv/adv.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PopularCarsComponent,RouterLink,MatButtonModule,MatIconModule,TrendingComponent, AdvComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  carsYears: Set<number>
  hatchback = CarTypes.Hatchback
  cars = signal<Car[]>([])
  trending = signal<Car[]>([])
  subscription = new Subscription();
  subscriptionTrending = new Subscription()
  popular= [CarBrands.Lamborghini,CarBrands.Audi,CarBrands.Renault,CarBrands.Dodge,CarBrands.Jaguar, CarBrands.Toyota]
  types = [CarTypes.SUV,CarTypes.Coupe, CarTypes.Crossover]
  fuelTypes = [FuelType.Hybrid, FuelType.Electric, FuelType.Diesel]
  item = signal(0)
  images = ['home-images/8cut.jpg','home-images/9.jpeg','home-images/7.jpeg','home-images/5cut.jpg']
  constructor(private carsService: CarsService) {  }

  getPopularCars(searchQueryParams:SearchQueryParams = {}) {
    this.subscription = this.carsService
      .getCars(searchQueryParams)
      .subscribe((data) => {
        console.log(data.payload)
        this.cars.set(data.payload)        
      });
  }

  getTrendingCars(searchQueryParams: SearchQueryParams = {}){
    this.subscriptionTrending = this.carsService
    .getCars(searchQueryParams)
    .subscribe((data) => {
      console.log(data.payload)
      this.trending.set(data.payload)        
    });
  }
  loopImages(direction: string){
    
    if(direction === 'next' && this.images.length-1 > this.item()){
      this.item.update((v)=>v+1)
    }
    if(direction === 'next' && this.images.length-1 <= this.item()){
      return
    }
    if(direction === 'previous' && this.item() !== 0){
      this.item.update((v)=>v-1)
    }
  }
  ngOnInit(){
    this.getPopularCars({brand: CarBrands.Lamborghini})
    this.handleNewCars(true)
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.subscriptionTrending.unsubscribe()
  }
  
  
  handleChangeBrand(value: CarBrands){
    
    this.getPopularCars({brand: value})
  }
  handleChangeType(value: CarTypes){
    this.getPopularCars({type: value})
  }
  handleNewCars(value: boolean){
    this.getTrendingCars({isNew: value})
  }

  handleFuel(value:FuelType){
    this.getPopularCars({fuelType: value})
  }
  handleTrendingType(value: CarTypes){
    this.getTrendingCars({type: value})
  }
  handleUnderFifty(){
    const sort = SortDirection.ASC
    this.getTrendingCars({sortBy: 'price', sortDirection: sort})
  }
}

