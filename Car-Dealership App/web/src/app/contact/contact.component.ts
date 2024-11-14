import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatIcon, ContactFormComponent, MatButton],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  ifFormSubmitted = signal<boolean>(false)
  closeMessage(){
    this.ifFormSubmitted.set(false)

  }
}
