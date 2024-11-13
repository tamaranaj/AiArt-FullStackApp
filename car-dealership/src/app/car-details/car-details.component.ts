import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CarsService } from '../../services/cars.service';
import { LoaderComponent } from '../loader/loader.component';
import { AppStore } from '../../store/app.store';
import { catchError, of, Subscription, switchMap, tap } from 'rxjs';
import { Car } from '../../types/car.interface';
import {MatExpansionModule} from '@angular/material/expansion';
import { CurrencyPipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [LoaderComponent,MatExpansionModule, CurrencyPipe, MatBadgeModule, MatIconModule,MatTooltipModule,MatButtonModule ],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
  appStore = inject(AppStore)
  car: Car | null
  image=signal(0)
  subscription = new Subscription()
  readonly panelOpenState = signal(false);
  constructor(private readonly carService: CarsService, private notificationService: NotificationService,private readonly route: ActivatedRoute, private readonly router: Router){
    effect(()=>{
      this.appStore.setIsLoading(true)
      this.getCar()
    },{allowSignalWrites: true})
  }
  
  getCar(){
    this.subscription = this.route.params.pipe(
      switchMap(params=>this.carService.getCarByID(params['id'])),
      catchError(()=>{
        this.router.navigate([''])
        return of(null)
      }),
      tap(()=>this.appStore.setIsLoading(false))
    ).subscribe((car)=>
     {if(car){
      this.car = car
      console.log(car)
     }}
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  myFunction() {
    let popup = document.getElementById("myPopup");
    popup?.classList.toggle("show");
  }

  loopImages(direction: string){
    let images = this.car == null? 0 : this.car.images.length -1
    if(direction === 'next' && images > this.image()){
      this.image.update((v)=>v+1)
    }
    if(direction === 'next' && images<= this.image()){
      return
    }
    if(direction === 'previous' && this.image() !== 0){
      this.image.update((v)=>v-1)
    }
  }
  handleAddFavorites(car: Car | null){
    if(car !==null){
      console.log(car)
      let check = this.appStore.setFavoriteCars(car)
      if(check){
        this.notificationService.openSnackBar('Item is added in favorites list!')
      }else{
        this.notificationService.openSnackBar('Item is already in favorites list!')
      }
      
    }
    
  }
  goToOrders(id: string | undefined){
    console.log(id)
    if(id){
      this.router.navigate([`orders/${id}`])
    }
    
   }
}
