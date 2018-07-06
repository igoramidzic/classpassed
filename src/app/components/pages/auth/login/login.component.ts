import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hasError: String = null;
  submitting: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
			'email': new FormControl(''),
			'password': new FormControl('')
		});
  }

  onLogin () {

    this.hasError = null;
    this.submitting = true;

    let user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    }

    this.authService.loginUserWithEmail(user)
      .then(res => {
        console.log(res);
        this.submitting = false;
      })
      .catch(error => {
        this.submitting = false;
        console.log(error);
        if (error.code == 'auth/wrong-password' || error.code == 'auth/user-not-found' || error.code == 'auth/invalid-email') {
          this.hasError = 'Incorrect email or password';
        } else {
          this.hasError = 'An error has occured';
        }
      });
  }

}
