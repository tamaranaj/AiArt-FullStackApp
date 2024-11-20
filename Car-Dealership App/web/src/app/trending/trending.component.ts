import { Component, input } from '@angular/core';
import { Car } from '../../types/car.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
  cars= input.required<Car[]>()
}
