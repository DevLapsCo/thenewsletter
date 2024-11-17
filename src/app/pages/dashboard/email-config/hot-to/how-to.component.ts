// email-provider-docs.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

interface EmailProvider {
  name: string;
  smtp: {
    host: string;
    port: number;
    username: string;
  };
//   imap: {
//     host: string;
//     port: number;
//   };
  appPasswordSteps: string[];
}

@Component({
  selector: 'app-email-provider-docs',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
      <h1 mat-dialog-title class="text-3xl font-bold text-gray-800 mb-2">Email Provider Configuration Guide</h1>
      <div class="">
        <!-- Header -->
        <p  class="mb-5 text-gray-600">Configure your email client with the correct SMTP and IMAP settings</p>
      <!-- Provider Selection Tabs -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 border-b">
          @for (provider of providers | keyvalue; track provider.key) {
            <button 
              [class]="selectedProvider === provider.key ? 
                'px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium' : 
                'px-4 py-2 text-gray-600 hover:text-blue-600'"
              (click)="selectedProvider = provider.key"
            >
              {{provider.value.name}}
            </button>
          }
        </div>
      </div>

      <mat-dialog-content class="mat-typography">
          <!-- Provider Settings -->
      @for (provider of providers | keyvalue; track provider.key) {
        @if (selectedProvider === provider.key) {
          <div class="space-y-6">
            <!-- SMTP Settings -->
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 class="text-xl font-semibold text-gray-800">SMTP Settings</h2>
              </div>
              <div class="grid gap-4">
                <div class="grid grid-cols-2 items-center gap-4">
                  <span class="font-medium text-gray-700">Host:</span>
                  <code class="bg-gray-100 px-3 py-1 rounded text-gray-800">{{provider.value.smtp.host}}</code>
                </div>
                <div class="grid grid-cols-2 items-center gap-4">
                  <span class="font-medium text-gray-700">Port:</span>
                  <code class="bg-gray-100 px-3 py-1 rounded text-gray-800">{{provider.value.smtp.port}}</code>
                </div>
                <div class="grid grid-cols-2 items-center gap-4">
                  <span class="font-medium text-gray-700">Username:</span>
                  <code class="bg-gray-100 px-3 py-1 rounded text-gray-800">{{provider.value.smtp.username}}</code>
                </div>
              </div>
            </div>

            <!-- IMAP Settings -->
            <!-- <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                </svg>
                <h2 class="text-xl font-semibold text-gray-800">IMAP Settings</h2>
              </div>
              <div class="grid gap-4">
                <div class="grid grid-cols-2 items-center gap-4">
                  <span class="font-medium text-gray-700">Host:</span>
                  <code class="bg-gray-100 px-3 py-1 rounded text-gray-800">{{provider.value.imap.host}}</code>
                </div>
                <div class="grid grid-cols-2 items-center gap-4">
                  <span class="font-medium text-gray-700">Port:</span>
                  <code class="bg-gray-100 px-3 py-1 rounded text-gray-800">{{provider.value.imap.port}}</code>
                </div>
              </div>
            </div> -->

                        <!-- App Password Steps -->
                        <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 class="text-xl font-semibold text-gray-800">How to Get App Password</h2>
              </div>
              <ol class="list-decimal list-inside space-y-2">
                @for (step of provider.value.appPasswordSteps; track $index) {
                  <li class="text-gray-700">{{step}}</li>
                }
              </ol>
            </div>
          </div>
        }
      }

      <!-- Security Notice -->
      <div class="mt-8 bg-yellow-50 rounded-lg shadow p-6">
        <div class="flex items-start gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 class="font-semibold text-yellow-800 mb-2">Security Recommendations</h3>
            <ul class="list-disc list-inside space-y-1 text-sm text-yellow-700">
              <li>Always use TLS/SSL encryption when available</li>
              <li>Use app-specific passwords when possible</li>
              <li>Never share or store email passwords in plain text</li>
              <li>Regularly update app passwords and review connected applications</li>
            </ul>
          </div>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions class="actions" align="end">
    <button mat-button mat-dialog-close>Cancel</button>
   
</mat-dialog-actions>
  </div>

  `,
  styles: [`
    :host {
      display: block;
    }

    ::ng-deep .mat-mdc-dialog-surface{
    border-radius: 30px !important;
    padding: 20px;
}

::ng-deep .mat-mdc-dialog-container {
    padding: 0 !important;
}

::ng-deep .mat-mdc-dialog-title {
    padding: 0 !important;
    font-size: 20px !important;
    margin-bottom: 10px;
    font-weight: 500;
}

::ng-deep .mat-mdc-dialog-title::before {
    height: 0;
    align-items: first baseline;
}

::ng-deep .mat-mdc-dialog-actions {
    align-items: last baseline;
    padding: 0 !important;
}

.actions button:first-child{
    background-color: #ddd;
    color: #000;
    padding: 7px 15px;
    border-radius: 25px;
}

  `]
})
export class EmailProviderDocsComponent {
  selectedProvider = 'gmail';

  providers: Record<string, EmailProvider> = {
    gmail: {
      name: 'Gmail',
      smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        username: 'Your Gmail address'
      },
    //   imap: {
    //     host: 'imap.gmail.com',
    //     port: 993
    //   },
      appPasswordSteps: [
        'Go to Google Account Settings',
        'Navigate to Security → 2-Step Verification',
        'Scroll to "App passwords"',
        'Choose "Mail" as the app',
        'Click "Generate"'
      ]
    },
    outlook: {
      name: 'Outlook',
      smtp: {
        host: 'smtp-mail.outlook.com',
        port: 587,
        username: 'Your Outlook address'
      },
    //   imap: {
    //     host: 'outlook.office365.com',
    //     port: 993
    //   },
      appPasswordSteps: [
        'Sign in to Microsoft account',
        'Go to Security settings',
        'Select "Create app password"',
        'Copy generated password'
      ]
    },
    yahoo: {
      name: 'Yahoo Mail',
      smtp: {
        host: 'smtp.mail.yahoo.com',
        port: 587,
        username: 'Your Yahoo address'
      },
    //   imap: {
    //     host: 'imap.mail.yahoo.com',
    //     port: 993
    //   },
      appPasswordSteps: [
        'Go to Account Security settings',
        'Click "Generate app password"',
        'Select "Mail" as the app',
        'Copy generated password'
      ]
    },
    icloud: {
      name: 'iCloud',
      smtp: {
        host: 'smtp.mail.me.com',
        port: 587,
        username: 'Your iCloud address'
      },
    //   imap: {
    //     host: 'imap.mail.me.com',
    //     port: 993
    //   },
      appPasswordSteps: [
        'Sign in to Apple ID account',
        'Go to Security section',
        'Generate App-specific password',
        'Label and create password',
        'Copy generated password'
      ]
    }
  };
}