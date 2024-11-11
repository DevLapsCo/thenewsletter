import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrComponent } from "./shared/toastr/toastr.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastrComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newletter';
}
