import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrMessage } from '../../../utils/constants/toaster.interface';
import { CustomToasterService } from '../../../services/custom-toaster/custom-toaster.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.css'
})
export class ToastrComponent implements OnInit, OnDestroy {
  message: ToastrMessage | null = null;
  subscription: Subscription | undefined;

  constructor(private toastrService: CustomToasterService) {}

  ngOnInit() {
    this.subscription = this.toastrService.toastrState.subscribe((message) => {
      this.message = message;
      if (message) {
        setTimeout(() => {
          this.toastrService.clear();
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}