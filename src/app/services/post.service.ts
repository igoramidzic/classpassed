import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Post } from '../models/post';
import { UserService } from './user.service';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth,
              private userService: UserService, private commentService: CommentService) {
  }

  // Get all posts
  retrieveAllPosts () {
    this.afs.collection('posts', ref => {
      return ref.orderBy('timestamp', 'desc').limit(15);
    }).snapshotChanges().subscribe(async data => {

      let posts = await this.mapDataToPosts(data);

      this.posts.next(posts);
    })
  }

  // Filter posts by filter
  filterPosts (filter: String) {
    this.afs.collection('posts', ref => {
      return ref.orderBy('timestamp', 'desc').where('channel', '==', filter);
    }).snapshotChanges().subscribe(async data => {
      let posts = await this.mapDataToPosts(data);
      this.posts.next(posts);
    })
  }

  // Get one post by ID
  getPost (id: String) {
    return new Promise ((resolve, reject) => {
      this.afs.doc('posts/' + id).ref.get()
        .then(async data => {
          if (data.exists) {
            await this.mapDataToOnePost(data)
            .then(res => resolve(res));
            resolve();
          } else {
            reject('Post not found');
          }
        })
    })
  }

  // Map all data to one post
  async mapDataToOnePost (res) {
    return await new Promise (async (resolve, reject) => {
      const data = res.data() as any;
      const id = res.ref.id;
      const postRef = res.ref;
      let user = null;
      let comments = [];

      await this.userService.getUserData(data.creator)
        .then(res => user = res);

      await this.commentService.getPostComments(res.ref)
        .then((res: any[]) => comments = res);

      resolve({ id, ...data, postRef, user, comments });
    })
  }

  // Map all data to posts array
  async mapDataToPosts (data) {
    return await Promise.all(data.map(async (a): Promise<any> => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      let user = null;

      await this.userService.getUserData(data.creator)
        .then(res => user = res);

      return { id, ...data, user };
    }));
  }

  createPost (postDetails: { title: String, body: String, channel: String}) {
    let postObject: Post = {
      title: postDetails.title,
      body: postDetails.body,
      timestamp: new Date(Date.now()),
      creator: this.afs.doc('users/' + this.afAuth.auth.currentUser.uid).ref,
      channel: postDetails.channel
    }

    return new Promise((resolve, reject) => {
      this.afs.collection('posts').ref.add(postObject)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  }

  editPost (postRef: DocumentReference, data: {title: String, body: String}) {
    return new Promise((resolve, reject) => {
      this.afs.doc(postRef).update(data)
        .then(() => resolve())
        .catch(error => reject(error));
    })
  }

  deletePost (postRef: DocumentReference) {
    return new Promise ((resolve, reject) => {
      this.afs.doc(postRef).delete()
        .then(() => resolve())
        .catch(error => reject(error));
    })
  }


}
