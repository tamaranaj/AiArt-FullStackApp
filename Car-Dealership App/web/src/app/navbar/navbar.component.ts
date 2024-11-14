import { Component, computed, effect, inject, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppStore } from '../../store/app.store';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  appStore = inject(AppStore)
  user = computed(()=>{if(localStorage.getItem('token')){
    return true
  }return false})
  constructor(){
    effect(()=>{},{allowSignalWrites: true})
  }
  logout(){
    this.appStore.setUserEmail('')
    localStorage.clear()
    
  }
}
