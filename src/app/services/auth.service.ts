import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userService: UserService,
              private router: Router, private route: ActivatedRoute) {}

  createUserWithEmail (userInfo: {email: string, password: string, username: string}) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(user => {
          this.userService.setUsersUsername(userInfo.username)
            .then(() => {
              this.router.navigate([(this.route.snapshot.queryParams['redirectTo'] || '')]);
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
        this.router.navigate(['']);
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
