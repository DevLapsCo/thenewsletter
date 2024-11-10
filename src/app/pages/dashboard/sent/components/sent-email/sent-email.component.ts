import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sent-email',
  standalone: true,
  imports: [],
  templateUrl: './sent-email.component.html',
  styleUrl: './sent-email.component.css'
})
export class SentEmailComponent {

  sanitizer = inject(DomSanitizer)

sanitizedMessage(email: any): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(email);
}

email =     {
  subject: "New Order Confirmation",
  to: ["customer@example.com"],
  message: `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>New Order Confirmation</title>

  <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="email-container" style="max-width: 600px; margin: 0 auto; text-align: center; background-color: #f4f4f4; padding: 40px;">
      <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">Thank you for your order!</h1>
      <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">We've received your order and are processing it now. You should receive your items within 3-5 business days.</p>
      <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">If you have any questions or concerns, please don't hesitate to reach out to our customer support team.</p>
      <a href="#" class="cta" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: 700; display: inline-block; margin-top: 20px;">View Order Details</a>
  </div>
</body>
</html>
`,
  createdAt: "2023-04-15T12:34:56Z"
}

}
