import { Component, inject } from '@angular/core';
// import { AuthService } from '../../services/core/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { AuthorizeService } from '../../../services/authorization/auth.service';
import { CustomToasterService } from '../../../services/custom-toaster/custom-toaster.service';
import { OAuth2Google } from '../../../utils/constants/api.base';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth : AuthService, private authorize : AuthorizeService, private router : Router){}

  email! : string;
  password! : string;

  // Injections

  toaster = inject(CustomToasterService)

  login(){
    this.auth.loginUser({email : this.email, password : this.password}).subscribe({
      next: (n : any) => {
        this.authorize.storeJwt(n.token);
        this.authorize.generalStorageFtn(n.refreshToken, 'ref_tkn')
        this.authorize.generalStorageFtn(n.user.id, 'uid')
        this.toaster.show("success", "Login Successful!")
      },
      error : (e) => {
        this.toaster.show("error", "Login not Successful!")
      },
      complete: () => {
        this.router.navigate(['/dashboard'])
      }
    })
  }

  googleOAuth(){
    console.log("Works!")
    window.location.href= OAuth2Google;
  }
}
