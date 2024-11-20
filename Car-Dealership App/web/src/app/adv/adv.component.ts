import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-adv',
  standalone: true,
  imports: [MatButton, RouterLink],
  templateUrl: './adv.component.html',
  styleUrl: './adv.component.css'
})
export class AdvComponent {
  constructor(private router: Router){ }
  navigate(path: string){
    this.router.navigate([`${path}`])
  }
}
