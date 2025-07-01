export const emailUpdateTemplate = (userName, newEmail) => {
  return `
    <div style="max-width:600px; margin:auto; font-family:Arial, sans-serif; background-color:#f9f9f9; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
      <div style="background-color:#ffffff; padding:20px; text-align:center;">
        <img src="https://res.cloudinary.com/dcehb4nl1/image/upload/v1750073722/omnexa_logo_d47yf9.jpg" alt="Omnexa Global Trade" style="width:180px; margin-bottom:20px;" />
        <h2 style="color:#333333; margin:0;">Your Email Address Has Been Updated</h2>
      </div>

      <div style="padding:20px; background-color:#ffffff;">
        <p style="font-size:16px; color:#555;">Hello <strong>${userName}</strong>,</p>

        <p style="font-size:16px; color:#555; line-height:1.6;">
          We're confirming that your email address has been successfully updated in your <strong>Omnexa Global Trade</strong> account.
        </p>

        <p style="font-size:16px; color:#555; line-height:1.6;">
          Your new registered email is: <strong>${newEmail}</strong>
        </p>

        <p style="font-size:16px; color:#555; line-height:1.6;">
          If you did not request this change or believe it was made in error, please contact our support team immediately.
        </p>

        <p style="font-size:16px; color:#555; line-height:1.6;">
          Thank you for staying connected with Omnexa. We’re committed to keeping your account secure and up to date.
        </p>
      </div>

      <div style="background-color:#f0f0f0; padding:20px; text-align:left; font-size:14px; color:#444;">
        <p style="margin:0; font-weight:bold;">Warm regards,</p>
        <p style="margin:4px 0;">Team Omnexa Global Trade</p>
        <p style="margin:4px 0;">📧 <a href="mailto:aditya.jagtap@omnexaglobal.com" style="color:#0066cc;">aditya.jagtap@omnexaglobal.com</a></p>
        <p style="margin:4px 0;">🌐 <a href="https://www.omnexaglobal.com" style="color:#0066cc;" target="_blank">www.omnexaglobal.com</a></p>
        <br />
      </div>
    </div>
  `;
}
