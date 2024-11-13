import { Order } from "./account.response.interface";
import { Car } from "./car.interface";

export interface OrderByID extends Order{
    car: Car
}
