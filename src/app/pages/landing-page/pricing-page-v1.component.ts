import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Pricing Header -->
      <div class="bg-blue-600 text-white text-center py-16">
        <h1 class="text-4xl font-bold mb-4">Transparent Pricing</h1>
        <p class="text-xl max-w-2xl mx-auto">Choose the plan that fits your email marketing needs. No hidden fees, no surprises.</p>
      </div>

      <!-- Pricing Cards -->
      <div class="container mx-auto px-4 -mt-12">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Starter Plan -->
          <div class="bg-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <h2 class="text-2xl font-bold mb-4 text-blue-600">Starter</h2>
            <div class="mb-6">
              <span class="text-4xl font-bold">$29</span>
              <span class="text-gray-500">/month</span>
            </div>
            <ul class="mb-8 space-y-3">
              <li>Up to 5,000 subscribers</li>
              <li>Basic email templates</li>
              <li>Standard analytics</li>
              <li>Email support</li>
            </ul>
            <button class="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700">
              Get Started
            </button>
          </div>

          <!-- Pro Plan -->
          <div class="bg-white rounded-lg shadow-lg p-8 text-center transform scale-105 hover:scale-110 transition duration-300 border-2 border-blue-500">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span class="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
            </div>
            <h2 class="text-2xl font-bold mb-4 text-blue-600">Pro</h2>
            <div class="mb-6">
              <span class="text-4xl font-bold">$99</span>
              <span class="text-gray-500">/month</span>
            </div>
            <ul class="mb-8 space-y-3">
              <li>Up to 25,000 subscribers</li>
              <li>Advanced email templates</li>
              <li>Comprehensive analytics</li>
              <li>A/B testing</li>
              <li>Priority email support</li>
            </ul>
            <button class="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700">
              Choose Pro
            </button>
          </div>

          <!-- Enterprise Plan -->
          <div class="bg-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <h2 class="text-2xl font-bold mb-4 text-blue-600">Enterprise</h2>
            <div class="mb-6">
              <span class="text-4xl font-bold">Custom</span>
              <span class="text-gray-500">Pricing</span>
            </div>
            <ul class="mb-8 space-y-3">
              <li>Unlimited subscribers</li>
              <li>Custom email design</li>
              <li>Advanced segmentation</li>
              <li>Dedicated account manager</li>
              <li>24/7 premium support</li>
            </ul>
            <button class="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div class="max-w-2xl mx-auto space-y-4">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="font-bold mb-2">Can I change my plan later?</h3>
            <p>Yes, you can upgrade or downgrade your plan at any time.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="font-bold mb-2">Do you offer a free trial?</h3>
            <p>We offer a 14-day free trial with full access to Pro features.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="font-bold mb-2">What payment methods do you accept?</h3>
            <p>We accept all major credit cards and PayPal.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PricingComponent {}

