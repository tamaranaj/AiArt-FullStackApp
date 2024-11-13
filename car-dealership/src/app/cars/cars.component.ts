import { Component, input, signal } from '@angular/core';
import { Car } from '../../types/car.interface';
import { CarComponent } from '../car/car.component';
import {MatGridListModule} from '@angular/material/grid-list';
@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CarComponent,MatGridListModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'

})
export class CarsComponent {
  cars=input.required<Car[]>()
  cards=signal(0)
  gridResize(){
    if(window.innerWidth <= 480){
      this.cards.set(1)
    }else if(window.innerWidth <= 780){
      this.cards.set(2)
    }else if(window.innerWidth <= 1024){
      this.cards.set(3)
    }else if(window.innerWidth <= 1400){
      this.cards.set(4)
    }else{
      this.cards.set(4)
    }
  }
  ngOnInit(){
    this.gridResize()
  }
}
