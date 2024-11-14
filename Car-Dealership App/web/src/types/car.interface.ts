import { LocationCar } from "./car-location.interface";
import { CarBrands } from "./enums/car-brands.enum";
import { CarTypes } from "./enums/car-types.enum";
import { FuelType } from "./enums/fuel-type.enum";
import { Transmission } from "./enums/transmission.enum";

export interface Car {
    id: string; 
    description: string;
    price: number; 
    images: string[]; 
    type: CarTypes; 
    year: number; 
    color: string; 
    fuelType: FuelType; 
    distance: number; 
    isNew: boolean; 
    location: LocationCar;
    brand: CarBrands; 
    model: string; 
    enginePower: number; 
    doors: number; 
    seats: number; 
    transmission: Transmission; 
    createdAt?: string,
    updatedAt?: string
}
export interface CarCreation{
    description: string | null | undefined;
    price: number | null  | undefined; 
    images: string[]; 
    type: string | null | undefined; 
    year: number | null; 
    color: string | null | undefined; 
    fuelType: string | null | undefined; 
    distance: number | null; 
    isNew: boolean | null | undefined; 
    location: {
        city: string | null | undefined,
        country: string | null | undefined
    }
    brand: string | null | undefined; 
    model: string | null | undefined; 
    enginePower: number | null | undefined; 
    doors: number | null | undefined; 
    seats: number | null | undefined; 
    transmission: string | null | undefined; 
}
