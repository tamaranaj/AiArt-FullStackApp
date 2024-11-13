import { Component, input, output, OutputEmitterRef} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CarBrands } from '../../types/enums/car-brands.enum';
import {MatRadioModule} from '@angular/material/radio';
import { SortDirection } from '../../types/enums/sortDirection.enum';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatRadioModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  selectBrand=input<CarBrands>()
  selectSortBy = input<string>()
  selectSortDirection = input<SortDirection>()
  chooseCarsYear = input<number | undefined>(undefined)
  carsYears = input<Set<number>>()
  getCarsYear = output<any>()
  updateSelectBrand = output<any>()
  updateSortBy = output<any>()
  updateSortDirection = output<any>()
  brands = Object.values(CarBrands)
  sortDirection = SortDirection
  sortTypes = ['brand', 'model', 'year', 'transmission', 'distance', 'price']
  
  handleChange(event:any, emitter:OutputEmitterRef<any>){
    emitter.emit(event)
  }

 
}
