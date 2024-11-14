import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, of, Subscription } from 'rxjs';
import { AppStore } from '../../store/app.store';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  appStore = inject(AppStore)
  constructor(private authService:AuthService, private router:Router){ 
    effect(()=>{

    }, {allowSignalWrites: true})
  }
  userMe = new Subscription()
  subscription = new Subscription()
  hide = signal(true);
  // errorMessage = signal('')
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  loginForm : FormGroup
  ngOnInit(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  login(){
    console.log(this.loginForm.value)
    this.subscription = this.authService.login(this.loginForm.value).subscribe((response)=>{
      if(response){
        const{token, refreshToken} = response
        if(token !== '' && refreshToken !== ''){
          this.appStore.setIsAuth(true)
          localStorage.setItem('token', token)
          localStorage.setItem('refreshToken', refreshToken)
          this.appStore.setUserEmail(this.loginForm.get('email')?.value)
          this.router.navigate(['/account/info'])
        }
      }
      
      
    })
  }
}
