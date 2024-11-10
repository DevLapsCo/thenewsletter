import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrMessage } from '../../utils/constants/toaster.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomToasterService {

  constructor() { }

  private toastrSubject = new BehaviorSubject<ToastrMessage | null>(null);
  toastrState: Observable<ToastrMessage | null> = this.toastrSubject.asObservable();

  show(type: 'success' | 'error' | 'info' | 'warning', message: string) {
    this.toastrSubject.next({ type, message });
  }

  clear() {
    this.toastrSubject.next(null);
  }
}
