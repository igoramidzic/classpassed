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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
			'email': new FormControl('amidzicigor@yahoo.com'),
			'password': new FormControl('password')
		});
  }

  onLogin () {
    let user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    }

    this.authService.loginUserWithEmail(user)
      .then(() => {
      })
      .catch(error => {
      });
  }

}
