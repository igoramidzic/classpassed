import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() onToggleSidebar = new EventEmitter<boolean>();
  title: String;
  public loggedIn: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
