import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Location } from '../../../node_modules/@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userService: UserService,
              private router: Router, private route: ActivatedRoute, private afs: AngularFirestore,
              private location: Location) {}

  createUserWithEmail (userInfo: {email: string, password: string, username: string}) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(user => {
          this.userService.setUsersUsername(userInfo.username)
            .then(() => {
              this.location.back();
            })
            .catch(error => {
              alert(error);
            })
          resolve(user);
        })
        .catch(error => reject(error));
    })
  }

  loginUserWithEmail (userInfo: {email: string, password: string}) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(user => {
        this.location.back();
        resolve(user);
      })
      .catch(error => reject(error));
    })
  }

  logout () {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.signOut()
        .then(() => resolve())
        .catch(error => reject());
    })
  }

  getStatus () {
    return this.afAuth.authState;
  }

}
