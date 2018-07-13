import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getUserData('users/' + this.afAuth.auth.currentUser.uid)
          .then(user => {
            this.user.next(user);
          })
      } else {
        this.user.next(null);
      }
    })
  }

  setUsersUsername (username: string) {
    return new Promise ((resolve, reject) => {
      this.afs.doc('users/' + this.afAuth.auth.currentUser.uid).set({ username })
        .then(result => resolve())
        .catch(error => reject(error));
    })
  }

  getUserData (userRef) {
    return new Promise((resolve, reject) => {
      this.afs.doc(userRef).ref.get()
        .then(res => resolve(res.data()))
        .catch(error => reject(error));
    })
  }

  checkDuplicateUsername (username) {
    return new Promise ((resolve, reject) => {
      this.afs.collection('users').ref.where('username', '==', username).get()
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  }

}
