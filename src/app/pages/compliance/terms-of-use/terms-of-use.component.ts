import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

interface TermsSection {
  title: string;
  content: string | string[];
  type: 'text' | 'list' | 'pricing';
}

interface PricingTier {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
}

@Component({
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DatePipe],
  selector: 'app-terms-of-service',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terms-of-service.component.html'
})
export class TermsOfServiceComponent {
  readonly currentDate = new Date();

  pricingTiers: Array<PricingTier> = [
    {
      name: 'Startup',
      monthlyPrice: 5,
      yearlyPrice: 50,
      features: [
        'Up to 10,000 emails/month',
        'Basic templates',
        'Email support',
        'Analytics dashboard'
      ]
    },
    {
      name: 'Business',
      monthlyPrice: 20,
      yearlyPrice: 230,
      features: [
        'Up to 50,000 emails/month',
        'Advanced templates',
        'Priority support',
        'Advanced analytics',
        'Custom branding'
      ]
    },
    {
      name: 'Enterprise',
      monthlyPrice: 50,
      yearlyPrice: 590,
      features: [
        'Unlimited emails/month',
        'Custom templates',
        '24/7 support',
        'Advanced security',
        'API access',
        'Dedicated manager'
      ]
    }
  ] as const;

  readonly sections: ReadonlyArray<TermsSection> = [
    {
      title: '1. Service Description',
      type: 'text',
      content: 'The NewsLetter is an email campaign and newsletter platform that enables users to create, send, and manage email campaigns and newsletters. Our platform provides various features including email template creation, subscriber management, and analytics. By using our service, you agree to use it in accordance with applicable laws and these terms.'
    },
    {
      title: '2. User Accounts',
      type: 'list',
      content: [
        'You must be at least 18 years old to create an account',
        'You must provide accurate and complete information when creating an account',
        'You are responsible for maintaining the security of your account credentials',
        'You must immediately notify us of any unauthorized use of your account',
        'One account per user unless explicitly authorized by The NewsLetter',
        'Account sharing is prohibited',
        'You are responsible for all activities that occur under your account',
        'We reserve the right to suspend or terminate accounts that violate these terms'
      ]
    },
    {
      title: '3. Subscription Plans',
      type: 'pricing',
      content: [] // Using pricingTiers for this section
    },
    {
      title: '4. Acceptable Use',
      type: 'list',
      content: [
        'No spam or unsolicited commercial messages',
        'No malicious content or malware distribution',
        'No pornographic, adult, or nudity-related content',
        'No hate speech or discriminatory content',
        'No illegal activities or promotion of illegal activities',
        'No harassment or bullying',
        'No impersonation of individuals or organizations',
        'No violation of intellectual property rights',
        'No collection of user data without consent',
        'No automated or bulk email sending without proper verification',
        'No misleading or deceptive practices',
        'No distribution of harmful or offensive content'
      ]
    },
    {
      title: '5. Payment Terms',
      type: 'list',
      content: [
        'All prices are in USD unless otherwise specified',
        'Subscription fees are billed in advance on a monthly or annual basis',
        'You agree to pay all charges associated with your account',
        'Failure to pay may result in service suspension or termination',
        'Price changes will be notified 30 days in advance',
        'You are responsible for all applicable taxes',
        'Refunds are subject to our refund policy',
        'Promotional offers are subject to specific terms and conditions'
      ]
    },
    {
      title: '6. Data Protection and Privacy',
      type: 'list',
      content: [
        'We collect and process data in accordance with our Privacy Policy',
        'User data is stored securely and not shared with unauthorized third parties',
        'Users must comply with applicable data protection laws',
        'Users must obtain proper consent from their email recipients',
        'We implement industry-standard security measures to protect user data',
        'Users retain ownership of their content and subscriber lists',
        'We process data in compliance with GDPR and other applicable regulations',
        'Users must maintain appropriate records of subscriber consent'
      ]
    },
    {
      title: '7. Service Availability and Support',
      type: 'list',
      content: [
        'We strive to maintain 99.9% service uptime',
        'Scheduled maintenance will be announced in advance',
        'Support is provided based on your subscription tier',
        'Emergency support is available for critical issues',
        'We are not liable for service interruptions beyond our control',
        'Support response times vary by subscription tier',
        'We provide documentation and self-help resources',
        'Technical support is provided in English only'
      ]
    },
    {
      title: '8. Intellectual Property Rights',
      type: 'text',
      content: 'All content, features, and functionality of the NewsLetter platform, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of The NewsLetter or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.'
    },
    {
      title: '9. Limitation of Liability',
      type: 'text',
      content: 'To the maximum extent permitted by law, The NewsLetter shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.'
    },
    {
      title: '10. Modifications to Service',
      type: 'list',
      content: [
        'We reserve the right to modify or discontinue the service at any time',
        'Changes to features will be communicated in advance',
        'We may add, alter, or remove functionality',
        'Pricing changes will be notified 30 days in advance',
        'Service modifications may require users to update their implementations',
        'We provide migration support for significant changes'
      ]
    },
    {
      title: '11. Termination',
      type: 'list',
      content: [
        'You may terminate your account at any time',
        'We may terminate or suspend access to our service immediately without notice',
        'All provisions of the Terms which should survive termination shall survive',
        'Upon termination, you must cease all use of the service',
        'You are responsible for backing up your data before termination',
        'Paid subscriptions may be eligible for partial refunds as per our refund policy'
      ]
    },
    {
      title: '12. Dispute Resolution',
      type: 'text',
      content: 'Any dispute arising from these terms shall be resolved through good faith negotiations. If negotiations fail, the dispute shall be submitted to binding arbitration in accordance with the rules of the International Chamber of Commerce. The arbitration shall take place in Accra, Ghana, and shall be conducted in English. The arbitration award shall be final and binding on both parties.'
    },
    {
      title: '13. Indemnification',
      type: 'text',
      content: 'You agree to indemnify, defend, and hold harmless The NewsLetter, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including but not limited to attorney\'s fees) arising from: (i) your use of the service; (ii) your violation of these Terms; (iii) your violation of any third party rights, including without limitation any copyright, property, or privacy right.'
    },
    {
      title: '14. Force Majeure',
      type: 'text',
      content: 'Neither party shall be liable for any failure or delay in performance under these Terms arising from causes beyond its reasonable control, including but not limited to acts of God, war, terrorism, pandemic, natural disasters, or other similar events.'
    }
  ] as const;

  // Track by functions for better performance
  trackByTitle(index: number, item: TermsSection): string {
    return item.title;
  }

  trackByName(index: number, item: PricingTier): string {
    return item.name;
  }

  trackByIndex(index: number): number {
    return index;
  }

  // Sanitize HTML content (implement this method using DomSanitizer)
  public sanitizeHtml(content: string | string[]): string {
    if (Array.isArray(content)) {
      return content.join(' ');
    }
    // TODO: Implement proper HTML sanitization using DomSanitizer
    return content;
  }
}