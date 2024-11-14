import { Component, input, signal } from '@angular/core';
import { CreatedCar } from '../../../../types/account.response.interface';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-created-cars',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, CurrencyPipe,MatChipsModule, RouterLink ],
  templateUrl: './account-created-cars.component.html',
  styleUrl: './account-created-cars.component.css'
})
export class AccountCreatedCarsComponent {
  listedCars = input.required<CreatedCar[]>()
  constructor(private router: Router){}
  addNewCar(){
    this.router.navigate(['/create'])
  }
}
