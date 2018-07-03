import {Component, ViewChild, HostListener, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mainAppContainer') mainAppContainer:ElementRef;
  @ViewChild('sidenav') sidenav:ElementRef;
  mode = 'side';
  divWidth = 0;

  @HostListener('window:resize') onResize() {
    this.checkSidenavState(this.mainAppContainer.nativeElement.clientWidth);
  }

  ngOnInit () {
    this.checkSidenavState(this.mainAppContainer.nativeElement.clientWidth);
  }

  checkSidenavState (width) {
    if (width > 980) {
      this.mode = 'side';
      this.sidenav.open();
    } else {
      if (this.mode == 'side') {
        this.sidenav.close();
      }
      this.mode = 'push';
    }
  }
}
