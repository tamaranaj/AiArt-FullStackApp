import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AccountResponse } from '../../types/account.response.interface';
import {MatTabsModule} from '@angular/material/tabs';
import { AccountCreatedCarsComponent } from './components/account-created-cars/account-created-cars.component';
import { AccountOrdersComponent } from './components/account-orders/account-orders.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatTabsModule, AccountCreatedCarsComponent, AccountOrdersComponent, MatButton],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
    subscription = new Subscription()
    loggedUser : AccountResponse
    constructor(private authService: AuthService, private router:Router){}
    ngOnInit(){
      this.subscription = this.authService.userMe().subscribe((response)=>{
        if(response){
          this.loggedUser = response
        }
        console.log(this.loggedUser)
      })
    }

    logout(){
      this.router.navigate(['/'])
      localStorage.clear()

    }
}
