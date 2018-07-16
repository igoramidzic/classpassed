import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '../../../node_modules/angularfire2/firestore';
import { UserService } from './user.service';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private afs: AngularFirestore, private userService: UserService,
              private afAuth: AngularFireAuth) {}

  getPostComments (postRef) {
    return new Promise ((resolve, reject) => {
      this.afs.collection('comments', ref => {
        return ref.where('postRef', '==', postRef).orderBy('timestamp', 'desc');
      }).snapshotChanges().subscribe(res => {
        resolve(this.mapDataToComments(res));
      })
    })
  }

  async mapDataToComments (comments) {
    return await Promise.all(comments.map(async (a): Promise<any> => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      let user = null;

      await this.userService.getUserData(data.userRef)
        .then(res => user = res);

      return { id, ...data, user };
    }));
  }

  postComment (commentDetails: {comment: String, postRef: DocumentReference}) {
    this.afs.doc('/users/' + this.afAuth.auth.currentUser.uid).ref
    let commentObject: any = {
      comment: commentDetails.comment,
      postRef: commentDetails.postRef,
      userRef: this.afs.doc('/users/' + this.afAuth.auth.currentUser.uid).ref,
      timestamp: new Date(Date.now())
    }

    return new Promise((resolve, reject) => {
      this.afs.collection('comments').ref.add(commentObject)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  }
}
