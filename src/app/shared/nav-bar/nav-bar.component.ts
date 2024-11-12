import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user-data/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{

  ngOnInit(): void {
    this.findUserData()
  }

  userService = inject(UserService)

  isAdmin = false;

  userData : any;

  findUserData(){
    const id = localStorage.getItem("uid");

    if(id != null)
    this.userService.getUserData({Id : id}).subscribe({
      next: (n : any) => {
        console.log(n);
        this.userData = n
        if(n.roles.includes("ADMIN")){
          this.isAdmin = true
        }
      }
    })
  }

}
