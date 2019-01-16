import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass', './login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder,private router: Router) {
    
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  get f() { return this.loginForm.controls; }


  onSubmit(): void{
    this.submitted = true;
        console.log(this.loginForm);

        // stop here if form is invalid
        if (this.loginForm.invalid) {
          console.log(this.loginForm + "invalid");
            return;
        }
        console.log(this.loginForm);
        alert('SUCCESS!! :-)')

  }
  login(): void{

     this. onSubmit();
  }
}
