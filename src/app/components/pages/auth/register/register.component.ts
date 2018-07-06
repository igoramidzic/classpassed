import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hasError: String;
  submitting: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.hasError = null;
    this.submitting = false;

    this.registerForm = new FormGroup({
      'username': new FormControl(''),
			'email': new FormControl(''),
			'password': new FormControl('')
		});
  }

  onRegister () {

    this.submitting = true;

    let user = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      username: this.registerForm.get('username').value
    }

    this.checkFormValidity();

    if (this.registerForm.valid) {
      this.authService.createUserWithEmail(user)
      .then(user => {
        this.submitting = false;
      })
      .catch(error => {
        this.submitting = false;

        console.log(error);
        if (error.code == 'auth/invalid-email') {
          this.registerForm.controls['email'].setErrors({ error: 'Invalid email' });
        } else if (error.code == 'auth/email-already-in-use') {
          this.registerForm.controls['email'].setErrors({ error: 'Email is already taken' });
        } else if (error.code == 'auth/weak-password') {
          this.registerForm.controls['password']
              .setErrors({ error: 'Must be at least 6 characters' });
          console.log(this.registerForm.controls['password'].errors);
        }
      })
    } else {
      this.submitting = false;
    }
  }

  checkFormValidity () {
    let user = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      username: this.registerForm.get('username').value
    }

    if (!user.username) {
      this.registerForm.controls['username'].setErrors({ error: 'Username cannot be empty' });
    } else if (user.username.length < 5) {
      this.registerForm.controls['username'].setErrors({ error: 'Must be at least 5 characters' });
    }

    if (!user.email) {
      this.registerForm.controls['email'].setErrors({ error: 'Email cannot be blank' });
    }

    if (!user.password) {
      this.registerForm.controls['password'].setErrors({ error: 'Password cannot be blank' });
    }
  }

}
