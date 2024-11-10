import { AfterViewInit, Component } from '@angular/core';
import { AuthorizeService } from '../../../services/authorization/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryparamService } from '../../../services/param/queryparam.service';
import { switchMap, map } from 'rxjs';
import { CustomToasterService } from '../../../services/custom-toaster/custom-toaster.service';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements AfterViewInit {

  constructor(private queryParams: QueryparamService, private toaster : CustomToasterService,  private auth: AuthorizeService, private route: ActivatedRoute, private router: Router) {}

  id!: string;

  ngAfterViewInit(): void {
    this.handleQueryParams();
  }

  handleQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.authenticateUser(params['id']);
      }
      if (params['nucode'] && params['email']) {
        this.getRegistrationVerifyCode(params['nucode'], params['email']);
      }
    });
  }

  authenticateUser(id: string): void {
    this.auth.authorizeOAuth({ Id: id }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.auth.generalStorageFtn(response.refreshToken, 'ref_tkn');
        this.auth.generalStorageFtn(response.user.id, 'uId');
        this.auth.storeJwt(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getRegistrationVerifyCode(code: string, email: string): void {
     this.auth.authorizeRegistration({email: email, code : code}).subscribe({
      next: (n : any) => {
        this.auth.generalStorageFtn(n.refreshToken, 'ref_tkn');
        this.auth.generalStorageFtn(n.user.id, 'uId');
        this.auth.storeJwt(n.token);
        this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        this.toaster.show("error", "Verification not successful!")
      }
     })
  }
}
