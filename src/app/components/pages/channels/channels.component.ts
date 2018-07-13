import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { RouteDataService } from '../../../services/route-data.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  constructor(public postService: PostService, private route: ActivatedRoute,
              private routeDataService: RouteDataService) { }

  ngOnInit() {

    // this.page.init('boats', 'year', { reverse: true, prepend: false });

    this.route.url.subscribe(url => {
      if (url[1].path == 'all') {
        this.postService.retrieveAllPosts();
      } else {
        this.postService.filterPosts(url[1].path);
      }
    });
  }

  scrollHandler (e) {
    if (e === 'bottom') {
      // this.page.more();
    }
  }

}
