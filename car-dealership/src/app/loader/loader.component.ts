import { Component, input } from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner'
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  isLoading= input.required<boolean>()
}
