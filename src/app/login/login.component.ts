import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {UsersComponent} from '../users/users.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass', './login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
     email: string;
     password: string;
  constructor(private formBuilder: FormBuilder, private router: Router) {
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
   get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
    }
  /**
   * login function
   */
  login(): void {
        this.email = String(this.loginForm.controls.email);
        this.password = '' + (this.loginForm.controls.password);
        this.email = this.loginForm.controls['email'].value;
        this.password = this.loginForm.controls['password'].value;
        this.onSubmit();
        if ( this.email === 'gaurav@gmail.com' && this.password === 'gaurav1996') {
        this.router.navigate(['user']);
        } else {
        alert('Invalid credentials');
     }
    }
  }
