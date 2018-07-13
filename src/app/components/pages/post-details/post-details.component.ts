import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router, NavigationEnd } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post: any = {};

  constructor(private postService: PostService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.route.params.subscribe(res => {
        this.postService.getPost(res.postID)
        .then(post => {
          this.post = post;
        })
      })
    })
  }

}
