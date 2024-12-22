import { Routes } from "@angular/router";
import { OverviewComponent } from "../pages/dashboard/overview/overview.component";
import { NewMailComponent } from "../pages/dashboard/new-mail/new-mail.component";
import { SentComponent } from "../pages/dashboard/sent/sent.component";
import { SentEmailComponent } from "../pages/dashboard/sent/components/sent-email/sent-email.component";
import { SettingsComponent } from "../pages/dashboard/settings/settings.component";
import { EmailConfigComponent } from "../pages/dashboard/email-config/email-config.component";
import { AddTemplatesComponent } from "../pages/dashboard/add-templates/add-templates.component";
import { EmailBuilderComponent } from "../pages/modules/email-builder/email-builder.component";
import { TemplatesLayoutsComponent } from "../pages/modules/email-builder/components/templates-layouts/templates-layouts.component";
import { FilesComponent } from "../pages/modules/email-builder/components/files/files.component";
import { SessionComponent } from "../pages/dashboard/new-mail/sub-pages/session/session.component";
import { EditAndCampaignComponent } from "../pages/dashboard/new-mail/sub-pages/edit-and-campaign/edit-and-campaign.component";
import { AudienceComponent } from "../pages/dashboard/audience/audience.component";

export const routes : Routes = [
    {
        path:'',
        redirectTo: 'sent',
        pathMatch: 'full'
    },
    {
        path: 'overview',
        component: OverviewComponent,
    },
    {
        path: 'new-email',
        component: SessionComponent,
        title: 'New Email'     

    },
    {
        path: 'email-config',
        component: EmailConfigComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'add-template',
        component: AddTemplatesComponent
    },
    {
        path: 'audience',
        component: AudienceComponent
    },
    {
        path: 'sent',
        component: SentComponent,
        children: [
            {
                path: '',
                component: SentEmailComponent
            }
        ]
    }
];