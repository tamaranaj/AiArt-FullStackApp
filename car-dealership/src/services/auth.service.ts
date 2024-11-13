import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { RegisteredUser } from '../types/api-response-register';
import { AccountResponse } from '../types/account.response.interface';
import { OrderByID } from '../types/orderByID.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authPath = environment.apiURL + '/auth'
  constructor(private http: HttpClient) { }
  register(userInfo: {email:string, password:string}){
    return this.http.post<RegisteredUser>(`${this.authPath}/register`, userInfo).pipe(
      catchError((error)=>{
        console.log(error)
        return of(null)
      })
    )
  }

  login(userInfo: {email:string, password:string}){
    return this.http.post<{token: string, refreshToken: string}>(`${this.authPath}/login`, userInfo).pipe(
      catchError((error)=>{
        console.log(error)
        return of({token:'', refreshToken: ''})
      })
    )
  }
  userMe(){
    return this.http.get<AccountResponse>(`${environment.apiURL}/users/me`, {headers:{
       'Authorization': `Bearer ${localStorage.getItem('token')}`
    }}).pipe(
      catchError((error)=>{
        console.log(error)
        return of(null)
      })
    )
  }

  getOrderByID(id:string){
    return this.http.get<OrderByID[]>(`${environment.apiURL}/orders/${id}`, {headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`
   }}).pipe(
     catchError((error)=>{
       console.log(error)
       return of(null)
     })
   )
  }
}
