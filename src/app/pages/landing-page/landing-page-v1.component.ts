import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Navbar -->
      <nav class="bg-black text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-2xl font-bold">The NewsLetter</div>
          <div class="space-x-4 hidden md:block">
            <a href="#features" class="hover:text-blue-200">Features</a>
            <a [routerLink]="['/pricing']" class="hover:text-blue-200">Pricing</a>
            <a href="#contact" class="hover:text-blue-200">Contact</a>
            <button [routerLink]="['/login']" class="bg-[#0057FF] text-white px-4 py-2 rounded">Login</button>
            <button [routerLink]="['/register']" class="bg-white text-black px-4 py-2 rounded">Get Started</button>
          </div>
          <div class="md:hidden">
            <button (click)="toggleMobileMenu()" class="focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div *ngIf="isMobileMenuOpen" class="md:hidden bg-blue-700 absolute left-0 right-0 top-16">
          <div class="flex flex-col items-center space-y-4 py-4">
            <a href="#features" class="hover:text-blue-200">Features</a>
            <a href="#pricing" class="hover:text-blue-200">Pricing</a>
            <a href="#contact" class="hover:text-blue-200">Contact</a>
            <button [routerLink]="['/login']" class="bg-[#0057FF] text-white px-4 py-2 rounded">Login</button>
            <button [routerLink]="['/register']" class="bg-white text-blue-600 px-4 py-2 rounded">Get Started</button>
          </div>
        </div>
      </nav>

      <!-- Hero Section with Carousel -->
      <header class="flex-grow bg-gradient-to-r from-[#0057FF] to-black text-white">
        <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 text-center md:text-left">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Supercharge Your Email Campaigns</h1>
            <p class="text-xl mb-6">Intelligent email marketing made simple and powerful</p>
            <div class="space-x-4">
              <button [routerLink]="['/register']" class="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100">
                Start Free Trial
              </button>
              <button class="border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-600">
                Learn More
              </button>
            </div>
          </div>
          
          <div class="md:w-1/2 mt-8 md:mt-0">
            <div class="carousel relative w-full overflow-hidden rounded-lg shadow-lg">
              <div class="carousel-inner flex transition-transform duration-500" [style.transform]="'translateX(-' + (currentSlide * 100) + '%)'">
                <div class="carousel-item min-w-full flex-shrink-0">
                  <img src="/api/placeholder/600/400" alt="Email Campaign Dashboard" class="w-full h-auto"/>
                </div>
                <div class="carousel-item min-w-full flex-shrink-0">
                  <img src="/api/placeholder/600/400" alt="Analytics Interface" class="w-full h-auto"/>
                </div>
                <div class="carousel-item min-w-full flex-shrink-0">
                  <img src="/api/placeholder/600/400" alt="Segmentation Tools" class="w-full h-auto"/>
                </div>
              </div>
              
              <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button 
                  *ngFor="let slide of [0,1,2]; let i = index" 
                  (click)="setSlide(i)"
                  class="w-3 h-3 rounded-full"
                  [ngClass]="currentSlide === i ? 'bg-white' : 'bg-white/50'"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="features" class="py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-extrabold text-center text-black mb-12">Powerful Features for Your Success</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
      <!-- Feature 1 -->
      <div class="bg-white shadow-lg rounded-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300">
        <div class="bg-[#0057FF] w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-black mb-4">Advanced Analytics</h3>
        <p class="text-gray-700">Gain actionable insights into your email campaigns with our comprehensive analytics tools.</p>
      </div>

      <!-- Feature 2 -->
      <div class="bg-white shadow-lg rounded-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300">
        <div class="bg-[#0057FF] w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11c0-1.038-.445-2-1.206-2.708C16.555 7.445 15.38 7 14 7H8.586l1.707-1.707a1 1 0 10-1.414-1.414l-3.999 4a1 1 0 000 1.414l4 4a1 1 0 001.414-1.414L8.586 9H14c.62 0 1.092.316 1.414.586C15.685 10.075 16 10.545 16 11v2.414l1.707-1.707a1 1 0 011.414 0l3.999 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L19 15.414V11z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-black mb-4">Smart Segmentation</h3>
        <p class="text-gray-700">Segment your audience intelligently and send targeted campaigns effortlessly.</p>
      </div>

      <!-- Feature 3 -->
      <div class="bg-white shadow-lg rounded-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300">
        <div class="bg-[#0057FF] w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.656 0-3-1.344-3-3s1.344-3 3-3 3 1.344 3 3-1.344 3-3 3zm1 2h3.86c.574 0 1.14.17 1.56.48l1.28.96c.78.58 1.3 1.47 1.3 2.46v5.52c0 .99-.52 1.88-1.3 2.46l-1.28.96c-.42.31-.986.48-1.56.48H6.14c-.574 0-1.14-.17-1.56-.48l-1.28-.96c-.78-.58-1.3-1.47-1.3-2.46v-5.52c0-.99.52-1.88 1.3-2.46l1.28-.96c.42-.31.986-.48 1.56-.48H11v5h1v-5zm1 5h2v2h-2v-2zm-5 2h2v-2H9v2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-black mb-4">Easy Automation</h3>
        <p class="text-gray-700">Automate your workflows to save time and focus on what matters most.</p>
      </div>

      <!-- Feature 4 -->
      <!-- <div class="bg-white shadow-lg rounded-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300">
        <div class="bg-[#0057FF] w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1v-6m-5-9h6a1 1 0 011 1v6m-1.414-3.586l-8 8a2 2 0 01-2.828 0l-4-4a2 2 0 010-2.828l8-8a2 2 0 012.828 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-black mb-4">Drag-and-Drop Builder</h3>
        <p class="text-gray-700">Design beautiful emails effortlessly with our intuitive drag-and-drop editor.</p>
      </div> -->

      <!-- Feature 5 -->
      <div class="bg-white shadow-lg rounded-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300">
        <div class="bg-[#0057FF] w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1-9v3m5.543.887l2.121-2.121M16 12h2m3.087.457l-2.121-2.121M12 16v6m-6.414-.457l2.121-2.121M8 16h2m-.457 3.087l-2.121 2.121" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-black mb-4">Custom Branding</h3>
        <p class="text-gray-700">Ensure your emails reflect your brand's personality with custom branding options.</p>
      </div>

      <!-- Feature 6 -->
      <div class="bg-white shadow-lg rounded-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300">
        <div class="bg-[#0057FF] w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5v2H5v2H3V7a2 2 0 012-2h4zm2 0h4a2 2 0 012 2v4h-2V7h-2V5zm8 8v4a2 2 0 01-2 2h-4v-2h2v-2h2zm-2 6h-4v2h4a2 2 0 002-2v-4h-2v4zM5 13H3v4a2 2 0 002 2h4v-2H5v-4z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-black mb-4">24/7 Support</h3>
        <p class="text-gray-700">Get dedicated support whenever you need it with our 24/7 customer service.</p>
      </div>
    </div>
  </div>
</section>


        <!-- Pricing Section -->
        <section id="pricing" class="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl font-bold text-center mb-16 text-gray-800">Simple, Transparent Pricing</h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
              <h3 class="text-2xl font-bold mb-4 text-blue-600">Starter</h3>
              <p class="text-5xl font-bold mb-6">$5 <span class="text-base">/month</span></p>
              <ul class="mb-8 space-y-3 text-gray-600">
                <li>Up to 5,000 contacts</li>
                <li>Basic analytics</li>
                <li>Email support</li>
                <li>Standard templates</li>
              </ul>
              <button class="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700">
                Get Started
              </button>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform border-2 border-blue-600">
              <h3 class="text-2xl font-bold mb-4 text-blue-600">Pro</h3>
              <p class="text-5xl font-bold mb-6">$20 <span class="text-base">/month</span></p>
              <ul class="mb-8 space-y-3 text-gray-600">
                <li>Up to 25,000 contacts</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
                <li>AI-powered insights</li>
                <li>Custom branding</li>
              </ul>
              <button class="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700">
                Choose Pro
              </button>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
              <h3 class="text-2xl font-bold mb-4 text-blue-600">Enterprise</h3>
              <p class="text-5xl font-bold mb-6">Custom</p>
              <ul class="mb-8 space-y-3 text-gray-600">
                <li>Unlimited contacts</li>
                <li>Full feature access</li>
                <li>Dedicated support</li>
                <li>Advanced integrations</li>
                <li>White-label solutions</li>
              </ul>
              <button class="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

       <!-- Testimonials Section -->
       <!-- <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl font-bold text-center mb-16 text-gray-800">What Our Customers Say</h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl shadow-lg p-6 text-center">
              <p class="italic mb-4">"The AI targeting has revolutionized our email campaigns. We've seen a 40% increase in engagement!"</p>
              <div class="font-bold text-blue-600">- Sarah Thompson, Marketing Director</div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6 text-center">
              <p class="italic mb-4">"Incredibly intuitive interface. Even our non-technical team members can create beautiful emails."</p>
              <div class="font-bold text-blue-600">- Mike Rodriguez, Startup Founder</div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6 text-center">
              <p class="italic mb-4">"The automation workflows have saved us countless hours of manual work."</p>
              <div class="font-bold text-blue-600">- Emily Chen, E-commerce Manager</div>
            </div>
          </div>
        </div>
      </section> -->

      <!-- Footer -->
      <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h4 class="font-bold mb-4">The NewsLetter</h4>
            <p>Revolutionizing email marketing with intelligent tools</p>
          </div>
          <div>
            <h4 class="font-bold mb-4">Quick Links</h4>
            <ul>
              <li><a href="#" class="hover:text-blue-300">Features</a></li>
              <li><a href="#" class="hover:text-blue-300">Pricing</a></li>
              <li><a href="#" class="hover:text-blue-300">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Legal</h4>
            <ul>
              <li><a href="#" class="hover:text-blue-300">Privacy Policy</a></li>
              <li><a [routerLink]="['/terms-of-service']" class="hover:text-blue-300">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Connect</h4>
            <div class="flex space-x-4">
              <a href="#" class="hover:text-blue-300">Twitter</a>
              <a href="#" class="hover:text-blue-300">LinkedIn</a>
            </div>
          </div>
        </div>
        <div class="text-center mt-8 border-t border-gray-700 pt-4">
          © 2024 The NewsLetter. All Rights Reserved.
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .carousel-item {
      flex: 0 0 100%;
    }

    .container{
        width: 100%;
        max-inline-size: 85rem;
    }
  `]
})
export class LandingPageComponent {
  isMobileMenuOpen = false;
  currentSlide = 0;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }

  ngOnInit() {
    // Auto-slide carousel every 5 seconds
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 3;
    }, 5000);
  }
}
