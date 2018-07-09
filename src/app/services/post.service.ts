import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Post } from '../models/post';
import { AngularFireModule, FirebaseApp } from '../../../node_modules/angularfire2';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth,
              private firebase: FirebaseApp) {
  }

  // Get all posts
  retrieveAllPosts () {
    this.afs.collection('posts', ref => {
      return ref.orderBy('timestamp', 'desc');
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
    return this.afs.doc('posts/' + id).ref.get();
  }

  // Map all data to posts array
  async mapDataToPosts (data) {
    return await Promise.all(data.map(async (a): Promise<any> => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      let user = null;

      // Get user data and add object to post object
      await this.afs.doc(data.creator).ref.get().then(res => {
        user = res.data();
      })

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


}
