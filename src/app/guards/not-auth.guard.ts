import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor (private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return new Promise ((resolve, reject) => {
        this.authService.getStatus().subscribe(user => {
          if (user) {
            if (this.router.url == state.url || this.router.url == null) {
              this.router.navigate(['']);
            } else {
              this.router.navigate([this.router.url]);
            }
            resolve(false);
          }
          resolve(true);
        })
      });
  }
}
