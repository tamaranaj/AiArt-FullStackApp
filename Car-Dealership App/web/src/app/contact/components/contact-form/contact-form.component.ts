import { Component, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatIconModule,MatFormFieldModule,MatInputModule, MatButton],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm: FormGroup
  submitted = output<boolean>()
  ngOnInit(){
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z/ /]+$/), Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z/ /]+$/), Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9,13}$/)]),
      message: new FormControl('', Validators.required)
    })
  }

  submit(){
    if(this.contactForm.invalid){
      return
    }
    console.log(this.contactForm.value)
    this.submitted.emit(true)
    this.contactForm.reset()
  }
}
