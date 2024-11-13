import { Car } from "./car.interface";

export interface ApiResponse{
    payload: Car[],
    total: number
}
