import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Section {
  icon: string;
  title: string;
  content: any;
  type: 'list' | 'grid' | 'text' | 'contact' | 'terms';
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-privacy-policy',
  template: `
    <div class="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      <div class="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex p-4 bg-blue-50 rounded-2xl mb-6">
            <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>

        <!-- Content Sections -->
        <div class="space-y-6">
          <div *ngFor="let section of sections" 
               class="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-blue-50 rounded-xl">
                <i [class]="section.icon + ' text-blue-600 text-xl'"></i>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">
                  {{section.title}}
                </h2>

                <!-- Grid Layout -->
                <div *ngIf="section.type === 'grid'" 
                     class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div *ngFor="let item of section.content" 
                       class="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                    <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span class="text-gray-700">{{item}}</span>
                  </div>
                </div>

                <!-- List Layout -->
                <ul *ngIf="section.type === 'list'" class="space-y-3">
                  <li *ngFor="let item of section.content" 
                      class="flex items-center gap-3 text-gray-600">
                    <div class="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {{item}}
                  </li>
                </ul>

                <!-- Text Layout -->
                <p *ngIf="section.type === 'text'" class="text-gray-600">
                  {{section.content}}
                </p>

                <!-- Contact Layout -->
                <div *ngIf="section.type === 'contact'" class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-xl">
                    <p class="text-gray-600">Email:</p>
                    <p class="text-gray-800 font-medium">{{section.content.email}}</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-xl">
                    <p class="text-gray-600">Address:</p>
                    <p class="text-gray-800 font-medium">{{section.content.address}}</p>
                  </div>
                </div>

                <!-- Terms Layout -->
                <div *ngIf="section.type === 'terms'" class="space-y-4">
                  <div class="bg-gray-50 p-4 rounded-xl">
                    <p class="text-gray-600 mb-3">{{section.content.description}}</p>
                    <a [href]="section.content.link" 
                       class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                      <span>View Terms of Service</span>
                      <i class="fas fa-external-link-alt text-sm"></i>
                    </a>
                  </div>
                  <ul class="space-y-2">
                    <li *ngFor="let highlight of section.content.highlights" 
                        class="flex items-center gap-3 text-gray-600">
                      <div class="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {{highlight}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-16 pt-8 border-t border-gray-100">
          <p class="text-center text-gray-500">
            Last updated: {{currentDate | date:'longDate'}}
          </p>
        </div>
      </div>
    </div>
  `
})
export class PrivacyPolicyComponent {
  currentDate = new Date();

  sections: Section[] = [
    {
      icon: 'fas fa-user-plus',
      title: 'Information We Collect',
      type: 'grid',
      content: ['Email address', 'Name', 'Profile picture', 'Google ID']
    },
    {
      icon: 'fas fa-database',
      title: 'How We Use Your Information',
      type: 'list',
      content: [
        'Create and manage your account',
        'Provide personalized services',
        'Communicate about our services',
        'Improve user experience'
      ]
    },
    {
      icon: 'fas fa-lock',
      title: 'Data Security',
      type: 'text',
      content: 'We implement industry-standard security measures to protect your personal information. Your data is encrypted, stored securely, and only accessible to authorized personnel.'
    },
    {
      icon: 'fas fa-file-alt',
      title: 'Your Rights',
      type: 'grid',
      content: [
        'Access your data',
        'Request corrections',
        'Delete your account',
        'Opt-out options'
      ]
    },
    {
      icon: 'fas fa-book',
      title: 'Terms of Service',
      type: 'terms',
      content: {
        description: 'Our Terms of Service govern your use of our email campaign and newsletter platform. Please review them carefully.',
        link: '/terms',
        highlights: [
          'Email campaign and newsletter creation guidelines',
          'Acceptable use policy and anti-spam requirements',
          'Subscriber data management and protection',
          'Service limitations and usage restrictions',
          'Content ownership and intellectual property rights'
        ]
      }
    },
    {
      icon: 'fas fa-envelope',
      title: 'Contact Us',
      type: 'contact',
      content: {
        email: 'info@devlaps.co',
        address: 'Tema, Greater Accra, Ghana.'
      }
    }
  ];
}