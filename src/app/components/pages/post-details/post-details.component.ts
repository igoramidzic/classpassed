import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router, NavigationEnd } from '../../../../../node_modules/@angular/router';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: any = null;
  createCommentForm: FormGroup;
  hasError: String;
  submitting: boolean;

  constructor(private postService: PostService, private route: ActivatedRoute,
              private router: Router, public userService: UserService,
              private commentService: CommentService) { }

  ngOnInit() {
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
    this.route.params.subscribe(res => {
      this.postService.getPost(res.postID)
      .then(post => {
        this.post = post;
      })
    }).unsubscribe();
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

  onEditPost () {

  }

  onLogin () {
    this.router.navigate(['', 'login']);
  }

  onSignup () {
    this.router.navigate(['', 'register']);
  }

}
