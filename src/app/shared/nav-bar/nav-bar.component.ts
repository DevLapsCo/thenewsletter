import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user-data/user.service';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonModule, SidebarModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  providers: []
})
export class NavBarComponent implements OnInit{

  ngOnInit(): void {
    this.findUserData()
  }

  userService = inject(UserService)
  router = inject(Router)

  sidebarVisible: boolean = false;
  isAdmin = false;

  userData : any;

  findUserData(){
    const id = localStorage.getItem("uid");

    if(id != null)
    this.userService.getUserData({Id : id}).subscribe({
      next: (n : any) => {
        // console.log(n);
        this.userData = n
        if(n.roles.includes("ADMIN")){
          this.isAdmin = true
        }
      }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''])
  }

  toggleNavBar(){
    this.sidebarVisible = true;
  }

}
