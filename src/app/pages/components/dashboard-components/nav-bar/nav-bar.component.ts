import { Component } from '@angular/core';
import { NotificationsComponent } from "../notifications/notifications.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar-dashboard',
  standalone: true,
  imports: [NotificationsComponent, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarDashboardComponent {

}
