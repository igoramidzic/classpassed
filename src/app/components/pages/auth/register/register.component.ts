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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null),
			'email': new FormControl(null),
			'password': new FormControl(null)
		});
  }

  onRegister () {
    let user = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      username: this.registerForm.get('username').value
    }
    this.authService.createUserWithEmail(user)
      .then(user => {
      })
      .catch(error => {
      })
  }

}
