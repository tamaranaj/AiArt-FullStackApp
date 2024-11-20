import { Component, input } from '@angular/core';
import { Car } from '../../types/car.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-cars',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './popular-cars.component.html',
  styleUrl: './popular-cars.component.css'
})
export class PopularCarsComponent {
  cars=input.required<Car[]>()
}
