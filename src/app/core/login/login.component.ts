import { AlertService } from './../../shared/alert.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitAttempt = false;
  constructor(private fb: FormBuilder,
              private auth:AuthService,
              private router:Router,
              private alertService:AlertService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  login(): void {
    this.submitAttempt = true;
     console.log('will do login');

    if ( this.loginForm.valid ) {
      console.log('valid vaues');
      let validUser = this.auth.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value);

      if(validUser) {
        this.router.navigate(['./dashboard']);
      }
      else  {

        this.alertService.error('Invalid Credential');
      }

    }
  }
}
