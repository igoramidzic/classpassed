import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPost('D6sOk60n1DLvW9bWf3PQ')
      .then(res => {
        let post = this.postService.mapDataToPosts(res.data());
        console.log(post);
      });
  }

}
