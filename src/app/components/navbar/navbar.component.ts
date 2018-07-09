import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() onToggleSidebar = new EventEmitter<boolean>();
  channelName: String;
  createPost: boolean;

  constructor(private route: ActivatedRoute, private router: Router, public userService: UserService,
              public authService: AuthService) { }

  ngOnInit() {
    this.route.firstChild.data.subscribe(data => {
      this.createPost = data.createPost;
    }).unsubscribe();

    this.router.events.subscribe(() => {
      this.route.firstChild.data.subscribe(data => {
        this.createPost = data.createPost;
      })
    });
  }

  onCreate () {
    this.router.navigate(['', 'c', 'create']);
  }

}
