import { Component, inject } from '@angular/core';
import { CarBrands } from '../../types/enums/car-brands.enum';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormsModule,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FuelType } from '../../types/enums/fuel-type.enum';
import { CarTypes } from '../../types/enums/car-types.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { Transmission } from '../../types/enums/transmission.enum';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Car, CarCreation } from '../../types/car.interface';
import { Subscription } from 'rxjs';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-create-car',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule, RouterLink
  ],
  templateUrl: './create-car.component.html',
  styleUrl: './create-car.component.css',
})
export class CreateCarComponent {
  private _formBuilder = inject(FormBuilder);
  subscription = new Subscription()
  constructor(private carService: CarsService){}
  firstFormGroup = this._formBuilder.group({
    brand: ['', Validators.required],
    model: ['', [Validators.required, Validators.minLength(2)]],
    year: [
      '',
      [
        Validators.required,
      ],
    ],
    color: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z/ /]+$/),
        Validators.minLength(3),
      ],
    ],
    enginePower: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(4),
        Validators.minLength(2),
      ],
    ],
    seats: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ],
    ],
    doors: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ],
    ],
    carType: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    transmission: ['', Validators.required],
    isNew: ['', Validators.required],
    city: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z/ /]+$/),
        Validators.minLength(3),
      ],
    ],state: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z/ /]+$/),
        Validators.minLength(3),
      ],
    ],
    distance: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(6),
      ],
    ],
    price: ['', Validators.required],
    description: [
      '',
      [Validators.required, Validators.pattern(/^[A-Za-z/ /]+$/), Validators.maxLength(250)],
    ],
    image: new FormArray([]),
    fuelType: ['', [Validators.required]],
  });
  isEditable = false;
  possibleBrands = Object.values(CarBrands);
  possibleFuelTypes = Object.values(FuelType);
  possibleCarTypes = Object.values(CarTypes);
  possibleTransmission = Object.values(Transmission);

  getValues() {
    console.log('first', this.firstFormGroup);
    console.log('second', this.secondFormGroup);
  }

  getImageControl(){
    let control = this.secondFormGroup.get('image') as FormArray
    return control.controls
  }
  onAddImage(){
    const control = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9_. /-]+$/)]);
    (<FormArray>this.secondFormGroup.get('image')).push(control)
}
getErrorMessage(controlName: string, form: FormGroup): string | null{
  const control = form.get(controlName)

  if(control?.hasError('required') && control.touched){
     return `This field is required.` 
  }
  if(control?.hasError('pattern') && control.touched){
    return `Please enter a valid value.` 
 }
  return null
}
deleteControlImage(index:number){
  (<FormArray>this.secondFormGroup.get('image')).removeAt(index)
  console.log(index)

}

checkImages(){
  let images = (<FormArray>this.secondFormGroup.get('image'))
  let length = images.length
  if(!length){
    return false
  }else if(images.controls.at(length-1)?.hasError('required') || images.controls.at(length -1)?.hasError('pattern') ){
    return true
  }else{
    return false
  }
}

  create(){
    let img = this.secondFormGroup.get('image') as FormArray
    let test = img.controls.map(c=> c.value)
    if(!this.firstFormGroup.invalid && !this.secondFormGroup.invalid){
      const car: CarCreation = {
        description: this.secondFormGroup.get('description')?.value,
        price: Number(this.secondFormGroup.get('price')?.value),
        images: [...test],
        type: this.firstFormGroup.get('carType')?.value,
        year: Number(this.firstFormGroup.get('year')?.value),
        color: this.firstFormGroup.get('color')?.value,
        fuelType: this.secondFormGroup.get('fuelType')?.value,
        distance: Number(this.secondFormGroup.get('distance')?.value),
        isNew: this.secondFormGroup.get('isNew')?.value == 'new' ? true : false,
        location: { 
          city: this.secondFormGroup.get('city')?.value,
          country: this.secondFormGroup.get('state')?.value,
        },
        brand: this.firstFormGroup.get('brand')?.value,
        model: this.firstFormGroup.get('model')?.value,
        enginePower: Number(this.firstFormGroup.get('enginePower')?.value),
        doors: Number(this.firstFormGroup.get('doors')?.value),
        seats: Number(this.firstFormGroup.get('seats')?.value),
        transmission: this.secondFormGroup.get('transmission')?.value,

      }

      this.subscription = this.carService.addNewCar(car).subscribe(r=> console.log(r))
    }
  }
}
