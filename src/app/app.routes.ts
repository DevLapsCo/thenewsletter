import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthorizationComponent } from './pages/auth/authorization/authorization.component';
import { authGuard } from './utils/guards/auth/auth.guard';
import { AwaitEmailComponent } from './pages/auth/authorization/await-email/await-email.component';
import { PrivacyPolicyComponent } from './pages/compliance/google-privacy-policy/google-compliance.component';
import { TermsOfServiceComponent } from './pages/compliance/terms-of-use/terms-of-use.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: LayoutComponent,
        canActivate: [authGuard],
        loadChildren: () => import('../app/routes/layout.routes').then(m => m.routes)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'privacy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'terms-of-service',
        component: TermsOfServiceComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'authorization',
        component: AuthorizationComponent
    },
    {
        path: 'await',
        component: AwaitEmailComponent
    }
];
