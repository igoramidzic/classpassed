import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  loginWithEmail (email: string, password: string) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        })
        .catch(error => {
          console.log(error);
        })
    })
  }


}
