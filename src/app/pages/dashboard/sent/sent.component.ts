import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormatDatePipe } from '../../../shared/tiome-format/time-format.pipe';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sent',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormatDatePipe, RouterLink],
  templateUrl: './sent.component.html',
  styleUrl: './sent.component.css',
})
export class SentComponent {
[x: string]: any;



  sentEmails = [
    {
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
    },
    {
      subject: "Account Verification",
      to: ["john@example.com"],
      message: `
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <title>Account Verification</title>
  
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
  </head>
  <body>
      <div class="email-container" style="max-width: 600px; margin: 0 auto; text-align: center; background-color: #f4f4f4; padding: 40px;">
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">Verify Your Account</h1>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Thank you for signing up with our service. To complete the registration process, please click the button below to verify your email address.</p>
          <a href="#" class="cta" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: 700; display: inline-block; margin-top: 20px;">Verify Email</a>
      </div>
  </body>
  </html>
  `,
      createdAt: "2023-04-10T09:15:22Z"
    },
    {
      subject: "Password Reset Instructions",
      to: ["jane@example.com"],
      message: `
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <title>Password Reset</title>
  
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
  </head>
  <body>
      <div class="email-container" style="max-width: 600px; margin: 0 auto; text-align: center; background-color: #f4f4f4; padding: 40px;">
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">Reset Your Password</h1>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">We've received a request to reset the password for your account. If you did not make this request, please ignore this email.</p>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">To reset your password, please click the button below:</p>
          <a href="#" class="cta" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: 700; display: inline-block; margin-top: 20px;">Reset Password</a>
      </div>
  </body>
  </html>
  `,
      createdAt: "2023-04-05T16:22:11Z"
    }
  ];



   htmlToText(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

}
