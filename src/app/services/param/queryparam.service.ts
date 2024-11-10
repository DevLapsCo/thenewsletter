import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryparamService {

  private queryParamSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(() => {
      this.route.queryParams.subscribe(params => {
        const paramValue = params['id'] || '';
        this.queryParamSubject.next(paramValue);
      });
    });
  }

  getAttributeFromUrl(attr: string): Observable<string> {
    return this.queryParamSubject.asObservable();
  }
}
