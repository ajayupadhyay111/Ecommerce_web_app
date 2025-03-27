export const verificationTemplate = (otp) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .wrapper {
              background-color: #f4f4f4;
              padding: 50px 20px;
          }
          .container {
              background-color: #ffffff;
              max-width: 600px;
              margin: 0 auto;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .logo {
              text-align: center;
              margin-bottom: 30px;
          }
          .logo img {
              height: 40px;
          }
          h1 {
              color: #1a1a1a;
              font-size: 24px;
              font-weight: 600;
              text-align: center;
              margin: 0 0 20px;
          }
          .content {
              margin: 30px 0;
              text-align: center;
          }
          p {
              color: #4a4a4a;
              font-size: 16px;
              line-height: 1.5;
              margin: 0 0 20px;
          }
          .otp-container {
              background-color: #f8f9fa;
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
          }
          .otp {
              font-family: monospace;
              font-size: 32px;
              font-weight: bold;
              color: #000000;
              letter-spacing: 4px;
              margin: 0;
          }
          .note {
              font-size: 14px;
              color: #666666;
              margin-top: 30px;
          }
          .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eaeaea;
          }
          .social-links {
              margin-bottom: 20px;
          }
          .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #666666;
              text-decoration: none;
          }
          .footer-text {
              color: #999999;
              font-size: 12px;
          }
      </style>
  </head>
  <body>
      <div class="wrapper">
          <div class="container">
              <div class="logo">
                  <!-- Replace with your logo -->
                  <h2 style="color: #000000;">Your Brand</h2>
              </div>
              
              <h1>Verify Your Email Address</h1>
              
              <div class="content">
                  <p>Thanks for signing up! Please use the verification code below to verify your email address.</p>
                  
                  <div class="otp-container">
                      <p class="otp">${otp}</p>
                  </div>
                  
                  <p>This code will expire in 10 minutes.</p>
                  
                  <p class="note">If you didn't request this verification, you can safely ignore this email.</p>
              </div>
              
              <div class="footer">
                  <div class="social-links">
                      <a href="#">Facebook</a> •
                      <a href="#">Twitter</a> •
                      <a href="#">Instagram</a>
                  </div>
                  <p class="footer-text">
                      This email was sent by Your Brand<br>
                      123 Street Name, City, Country<br>
                      © 2024 Your Brand. All rights reserved.
                  </p>
              </div>
          </div>
      </div>
  </body>
  </html>
    `;
  };