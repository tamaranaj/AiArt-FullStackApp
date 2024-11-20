import { Component, effect, inject, signal } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Subscription, tap } from 'rxjs';
import { CarsComponent } from '../cars/cars.component';
import { AppStore } from '../../store/app.store';
import { LoaderComponent } from '../loader/loader.component';
import { SearchQueryParams } from '../../types/searchQueryParams';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchCarsComponent } from '../search-cars/search-cars.component';
import { FiltersComponent } from '../filters/filters.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cars-for-sell',
  standalone: true,
  imports: [CarsComponent,MatSidenavModule, LoaderComponent,MatIconModule,MatButtonModule, MatPaginatorModule, SearchCarsComponent, FiltersComponent, MatExpansionModule],
  templateUrl: './cars-for-sell.component.html',
  styleUrl: './cars-for-sell.component.css'
})
export class CarsForSellComponent {
  carsYears: Set<number>
  appStore = inject(AppStore);
  subscription = new Subscription();
  showFiller = true;
  item = signal(0)
  images = ['home-images/9.jpeg','home-images/8cut.jpg','home-images/7.jpeg','home-images/5cut.jpg']
  constructor(private carsService: CarsService, private router:Router) {
    effect(()=>{
      this.appStore.setIsLoading(true)
      this.getCars(this.appStore.searchParams())
    },
    {allowSignalWrites: true})
  }

  getCars(searchQueryParams:SearchQueryParams = {}) {
    this.subscription = this.carsService
      .getCars(searchQueryParams)
      .pipe(tap((res) => {
        this.appStore.setIsLoading(true);
        if(!this.carsYears){
          const mappedYear=  res.payload.map(c=> c.year)
          this.carsYears = new Set([...mappedYear])
        }
      
      }))
      .subscribe((data) => {
        console.log(data.payload)
        this.appStore.setTotal(data.total);
        this.appStore.setCars(data.payload);
        this.appStore.setIsLoading(false);
        
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
  
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  handleExpansion(value:boolean){
    this.appStore.setHandleExpansion(value)
  }

  navigateToCreate(){
    this.router.navigate(['create'])
  }
}
