import { Component, input, signal } from '@angular/core';
import { Order } from '../../../../types/account.response.interface';
import {MatTableModule} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { OrderByID } from '../../../../types/orderByID.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-orders',
  standalone: true,
  imports: [MatTableModule, DatePipe, CurrencyPipe, MatButton],
  templateUrl: './account-orders.component.html',
  styleUrl: './account-orders.component.css'
})
export class AccountOrdersComponent {
  open=signal(false)
  subscription = new Subscription()
  userOrders = input.required<Order[]>()
  orderDetails = signal<OrderByID | null>(null)
  displayedColumns: string[] = ['OrderID', 'CreatedAt'];
  constructor(private router: Router, private authService: AuthService){}
  navigateItem(id: string){
    this.subscription = this.authService.getOrderByID(id).subscribe((res)=>{if(res){
      console.log(res)
      this.orderDetails.set(res[0])
    }})
    this.open.set(true)
  }
  seeCars(){
    this.router.navigate(['/'])
  }
}
