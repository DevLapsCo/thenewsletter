import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthorizationComponent } from './pages/auth/authorization/authorization.component';
import { authGuard } from './utils/guards/auth/auth.guard';
import { AwaitEmailComponent } from './pages/auth/authorization/await-email/await-email.component';
import { PrivacyPolicyComponent } from './pages/compliance/google-privacy-policy/google-compliance.component';
import { TermsOfServiceComponent } from './pages/compliance/terms-of-use/terms-of-use.component';
import { LandingPageComponent } from './pages/landing-page/landing-page-v1.component';
import { PricingComponent } from './pages/landing-page/pricing-page-v1.component';
import { EmailBuilderComponent } from './pages/modules/email-builder/email-builder.component';
import { FilesComponent } from './pages/modules/email-builder/components/files/files.component';
import { TemplatesLayoutsComponent } from './pages/modules/email-builder/components/templates-layouts/templates-layouts.component';
import { InstantComponent } from './pages/modules/instant/instant.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: LayoutComponent,
        canActivate: [authGuard],
        loadChildren: () => import('../app/routes/layout.routes').then(m => m.routes)
    },
    {
        path: 'home',
        title: 'The NewsLetter',
        component: LandingPageComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
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
        path: 'builder',
        component: EmailBuilderComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'templates-layouts',
                component: TemplatesLayoutsComponent
            },
            {
                path: 'files',
                component: FilesComponent
            }
        ]
    },
    {
        path: 'instant',
        component: InstantComponent,
        canActivate: [authGuard],
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
