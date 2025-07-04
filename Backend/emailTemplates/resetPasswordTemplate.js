export const resetPasswordTemplate = ( resetURL) => {
  return `
    <div style="max-width:600px; margin:auto; font-family:Arial, sans-serif; background-color:#f9f9f9; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
      <div style="background-color:#ffffff; padding:20px; text-align:center;">
        <img src="https://res.cloudinary.com/dcehb4nl1/image/upload/v1750073722/omnexa_logo_d47yf9.jpg" alt="Omnexa Global Trade" style="width:180px; margin-bottom:20px;" />
        <h2 style="color:#333333; margin:0;">Reset Your Password</h2>
      </div>

      <div style="padding:20px; background-color:#ffffff;">
        

        <p style="font-size:16px; color:#555; line-height:1.6;">
          We received a request to reset your password. If this was you, please use the link below to set a new password:
        </p>

        <p style="font-size:16px; word-break:break-all;">
          🔐 <a href="${resetURL}" style="color:#0066cc;">${resetURL}</a>
        </p>

        <p style="font-size:16px; color:#555; line-height:1.6;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>

      <div style="background-color:#f0f0f0; padding:20px; text-align:left; font-size:14px; color:#444;">
        <p style="margin:0; font-weight:bold;">Warm regards,</p>
        <p style="margin:4px 0;">Team Omnexa Global Trade</p>
        <p style="margin:4px 0;">📧 <a href="mailto:aditya.jagtap@omnexaglobal.com" style="color:#0066cc;">aditya.jagtap@omnexaglobal.com</a></p>
        <p style="margin:4px 0;">🌐 <a href="https://www.omnexaglobal.com" style="color:#0066cc;" target="_blank">www.omnexaglobal.com</a></p>
      </div>
    </div>
  `;
};
