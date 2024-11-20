import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { authGuard } from './auth.guard';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'shopping',children:[
        {path: '', loadComponent:()=>import('./cars-for-sell/cars-for-sell.component').then(c=>c.CarsForSellComponent)},
        {path: 'cars', children:[
            {path: ':id', loadComponent: ()=>import('./car-details/car-details.component').then(c=>c.CarDetailsComponent)}
        ]},
    ]},
    {path: 'contact', loadComponent: ()=>import('./contact/contact.component').then(c=>c.ContactComponent)},
    {path: 'login', loadComponent: ()=>import('./login/login.component').then(c=> c.LoginComponent)},
    {path: 'register', loadComponent: ()=>import('./register/register.component').then(c=> c.RegisterComponent)},
    {path: 'create', loadComponent: ()=>import('./create-car/create-car.component').then(c=>c.CreateCarComponent),canActivate: [authGuard]},
    {path: 'favorite', loadComponent: ()=>import('./favorites/favorites.component').then(c=>c.FavoritesComponent)},
    {path: 'orders', children: [
        {path: ':id',loadComponent: ()=>import('./orders/orders.component').then(c=>c.OrdersComponent),canActivate: [authGuard]}
    ]},
    {path: 'account', children: [
        {path: 'info',loadComponent: ()=>import('./account/account.component').then(c=>c.AccountComponent),canActivate: [authGuard]},
    ]},
];
