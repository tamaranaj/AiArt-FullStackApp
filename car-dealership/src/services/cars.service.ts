import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { BehaviorSubject, catchError,Observable,of  } from 'rxjs';
import { ApiResponse } from '../types/api-response.interface';
import { Car, CarCreation } from '../types/car.interface';
import { SearchQueryParams } from '../types/searchQueryParams';
import { OrdersResponse } from '../types/orders.response.interface';



@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsURL = `${environment.apiURL}/cars`
  private orders = `${environment.apiURL}/orders`
  private _favorites = new BehaviorSubject<Car[]>([])
  $favorites = this._favorites.asObservable()
  constructor(private readonly httpService: HttpClient) { }
  getCars(searchQueryParams: SearchQueryParams= {}):Observable<ApiResponse>{
    return this.httpService.get<ApiResponse>(this.carsURL,{
      params: {...searchQueryParams}
    })
    .pipe(
      catchError((error)=>{
        console.log(error)
        return of({payload: [], total: 0})
      })
    )
  }
  getCarByID(id:string):Observable<Car>{
    return this.httpService.get<Car>(`${this.carsURL}/${id}`)
  }
  addFavorites(car:Car){
    const favorites = this._favorites.getValue()
    if(favorites.find(c=>c.id==car.id))return
    this._favorites.next([...favorites, car])
  }


  updateFavorites(carID: string){
    const favorites = this._favorites.getValue().filter((car)=>car.id !== carID)
    this._favorites.next([...favorites])
  }

  addNewCar(newCar: CarCreation){
    return this.httpService.post(this.carsURL, newCar, {headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})
    .pipe(
      catchError((error)=>{
        console.log(error)
        return of(null)
      })
    )
  }

  makeOrder(car:{carId: string| undefined}){
    console.log('id in service',car)
    return this.httpService.post<OrdersResponse>(this.orders, car, {headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})
    .pipe(
      catchError((error)=>{
        console.log(error)
        return of(null)
      })
    )
  }
  
}
