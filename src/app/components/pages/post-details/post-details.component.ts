import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router, NavigationEnd } from '../../../../../node_modules/@angular/router';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { AngularFirestore } from '../../../../../node_modules/angularfire2/firestore';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: any = null;
  createCommentForm: FormGroup;
  editPostForm: FormGroup;
  hasError: String;
  submitting: boolean;
  loading: boolean;
  postLink: string;
  editPost: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute,
              private router: Router, public userService: UserService,
              private commentService: CommentService,
              private afs: AngularFirestore) { }

  ngOnInit() {
    this.postLink = window.location.href;
    this.route.params.subscribe(res => {
      this.getPost();
    })

    this.hasError = null;
    this.submitting = false;

    this.createCommentForm = new FormGroup({
			'comment': new FormControl(null, [
        Validators.required
      ])
    });


  }

  getPost () {
    this.loading = true;
    this.route.params.subscribe(res => {
      this.postService.getPost(res.postID)
      .then(post => {
        this.post = post;
        this.loading = false;
        this.editPostForm = new FormGroup({
          'title': new FormControl(this.post.title, [
            Validators.required
          ]),
          'body': new FormControl(this.post.body, [
            Validators.required
          ])
        })
      })
      .catch(error => {
        this.post = null;
        this.loading=false;
      })
    })
  }

  onSubmit () {
    let commentDetails = {
      comment: this.createCommentForm.get('comment').value,
      postRef: this.post.postRef
    }

    this.commentService.postComment(commentDetails)
      .then(res => {
        this.getPost();
        this.createCommentForm.get('comment').setValue(null);
      })
      .catch(error => console.log(error));
  }

  onEditPostSubmit () {
    if (this.editPostForm.valid && this.editPostForm.dirty) {
      let data = {
        title: this.editPostForm.get('title').value,
        body: this.editPostForm.get('body').value
      }
      this.postService.editPost(this.afs.doc('posts/' + this.post.id).ref, data)
        .then(res => {
          this.editPost = false;
          this.getPost();
        })
        .catch(error => console.log(error));
    }
  }

  onDeletePost () {
    this.postService.deletePost(this.afs.doc('posts/' + this.post.id).ref)
      .then(() => {
        this.router.navigate(['']);
      });
  }

  onDeleteComment (commentID) {
    this.commentService.deleteComment(this.afs.doc('comments/' + commentID).ref)
      .then(() => {
        this.getPost();
      });
  }

  onLogin () {
    this.router.navigate(['', 'login']);
  }

  onSignup () {
    this.router.navigate(['', 'register']);
  }

}
