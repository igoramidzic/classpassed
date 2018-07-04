import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild('mainAppContainer') mainAppContainer:ElementRef;
  @ViewChild('sidenav') sidenav:MatSidenav;
  mode = 'side';
  divWidth = 0;

  @HostListener('window:resize') onResize() {
    this.divWidth = this.mainAppContainer.nativeElement.clientWidth;
    this.checkSidenavState(this.mainAppContainer.nativeElement.clientWidth);
  }

  ngOnInit () {
    this.divWidth = this.mainAppContainer.nativeElement.clientWidth;
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
      this.mode = 'over';
    }
  }
}
