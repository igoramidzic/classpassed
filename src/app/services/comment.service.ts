import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private afs: AngularFirestore, private userService: UserService) {}

  getPostComments (postRef) {
    return new Promise ((resolve, reject) => {
      this.afs.collection('comments', ref => {
        return ref.where('post', '==', postRef);
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

      await this.userService.getUserData(data.creator)
        .then(res => user = res);

      return { id, ...data, user };
    }));
  }
}
