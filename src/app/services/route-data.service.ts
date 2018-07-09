import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteDataService {

  constructor(private route: ActivatedRoute, private router: Router) {
  }
}
