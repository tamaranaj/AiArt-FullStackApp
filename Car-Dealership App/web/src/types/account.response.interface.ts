import { Car } from "./car.interface";

export interface CreatedCar extends Car{
    updatedAt: string,
    seller?: string
}
export interface AccountResponse{
    createdCars: CreatedCar[]
    email: string,
    id: string,
    role: string
    orders: Order []   
}
export interface Order{
    createdAt: string
    updatedAt: string
    deletedAt?:string
    id: string
}
