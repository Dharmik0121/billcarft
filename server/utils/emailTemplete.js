export function generateVerificationOtpEmailTemplete(otpCode, name) {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 40px 0; margin: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <!-- Header -->
      <div style="background-color: #1e293b; padding: 20px; text-align: center;">
        <img src="https://i.imghippo.com/files/JiR6488q.png" alt="BillCraft Logo" style="width: 140px; height: auto; object-fit: contain; margin-bottom: 10px;" />
        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">BillCraft</h1>
        <p style="margin: 4px 0 0; color: #cbd5e1; font-size: 14px;">Smart Billing & Business Management</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #1f2937;">
        <h2 style="font-size: 18px; margin-bottom: 10px;">Hello, ${name}</h2>
        <p style="font-size: 15px; line-height: 1.6;">
          Thank you for signing up with <strong>BillCraft</strong>. To complete your registration, please verify your email address by entering the OTP below.
        </p>
        <p style="font-size: 15px; margin: 20px 0; color: #475569;">This OTP is valid for <strong>15 minutes</strong>.</p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 12px 24px; font-size: 20px; letter-spacing: 2px; border-radius: 6px;">
            ${otpCode}
          </span>
        </div>

        <p style="font-size: 14px; color: #6b7280;">
          If you did not create an account, you can safely ignore this email.
        </p>

        <p style="font-size: 14px; margin-top: 30px;">Best regards,<br /><strong>The BillCraft Team</strong></p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
        <p style="margin: 0;">BillCraft Inc, Business Tower, Tech City, India</p>
        <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} BillCraft. All rights reserved.</p>
      </div>
    </div>
  </div>
  `;
}

export function generateForgotPasswordEmailTemplete(resetPasswordUrl, name) {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 40px 0; margin: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background-color: #1e293b; padding: 20px; text-align: center;">
        <img src="https://i.imghippo.com/files/JiR6488q.png" alt="BillCraft Logo" style="width: 140px; height: auto; object-fit: contain; margin-bottom: 10px;" />
        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">BillCraft</h1>
        <p style="margin: 4px 0 0; color: #cbd5e1; font-size: 14px;">Smart Billing & Business Management</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #1f2937;">
        <h2 style="font-size: 18px; margin-bottom: 10px;">Hello, ${name}</h2>
        <p style="font-size: 15px; line-height: 1.6;">
          We received a request to reset your <strong>BillCraft</strong> account password. Click the button below to set a new password.
        </p>
        <p style="font-size: 15px; margin: 20px 0; color: #475569;">This link is valid for <strong>15 minutes</strong>.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetPasswordUrl}" style="background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 16px; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>

        <p style="font-size: 14px; color: #6b7280;">
          If you did not request this password reset, please ignore this email.
        </p>

        <p style="font-size: 14px; margin-top: 30px;">Best regards,<br /><strong>The BillCraft Team</strong></p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
        <p style="margin: 0;">BillCraft Inc, Business Tower, Tech City, India</p>
        <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} BillCraft. All rights reserved.</p>
      </div>
    </div>
  </div>
  `;
}
