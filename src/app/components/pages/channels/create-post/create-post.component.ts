import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '../../../../../../node_modules/@angular/forms';
import { PostService } from '../../../../services/post.service';
import { AngularFireAuth } from '../../../../../../node_modules/angularfire2/auth';
import { UserService } from '../../../../services/user.service';
import { AngularFirestore } from '../../../../../../node_modules/angularfire2/firestore';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  hasError: String;
  submitting: boolean;

  constructor(private postService: PostService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.hasError = null;
    this.submitting = false;

    this.createPostForm = new FormGroup({
      'title': new FormControl(''),
			'body': new FormControl(''),
			'channel': new FormControl('discussions')
		});
  }

  onCreate () {
    let postDetails = {
      title: this.createPostForm.controls['title'].value,
      body: this.createPostForm.controls['body'].value,
      channel: this.createPostForm.controls['channel'].value
    }

    this.postService.createPost(postDetails)
      .then(res => {
        this.router.navigate([ '', 'c', postDetails.channel ]);
      })
  }

}
