export const registerEmailTemplate = (userName) => {
    return `
    
        <div style="max-width:600px; margin:auto; font-family:Arial, sans-serif; background-color:#f9f9f9; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
  <div style="background-color:#ffffff; padding:20px; text-align:center;">
    
    <img src="https://res.cloudinary.com/dcehb4nl1/image/upload/v1750073722/omnexa_logo_d47yf9.jpg" alt="Omnexa Global Trade" style="width:180px; margin-bottom:20px;" />
    <h2 style="color:#333333; margin:0;">Thank You for Connecting with Us</h2>
  </div>

  <div style="padding:20px; background-color:#ffffff;">
    <p style="font-size:16px; color:#555;">Dear <strong>${userName}</strong>,</p>

    <p style="font-size:16px; color:#555; line-height:1.6;">
      Thank you for reaching out to <strong>Omnexa Global Trade</strong>.
      <br /><br />
      We appreciate your interest in partnering with us. At Omnexa, we take pride in delivering premium quality products with unmatched professionalism and global reach.
    </p>

    <p style="font-size:16px; color:#555; line-height:1.6;">
      One of our team members will get back to you shortly with more information. In the meantime, feel free to explore our offerings or request a quote directly on our website.
    </p>

    <p style="font-size:16px; color:#555; line-height:1.6;">
      We look forward to building a long-term and successful business relationship.
    </p>
  </div>

  <div style="background-color:#f0f0f0; padding:20px; text-align:left; font-size:14px; color:#444;">
    <p style="margin:0; font-weight:bold;">Warm regards,</p>
    <p style="margin:4px 0;">Team Omnexa Global Trade</p>
    <p style="margin:4px 0;">📧 <a href="mailto:info@omnexaglobal.com" style="color:#0066cc;">info@omnexaglobal.com</a></p>
    <p style="margin:4px 0;">🌐 <a href="https://www.omnexaglobal.com" style="color:#0066cc;" target="_blank">www.omnexaglobal.com</a></p>
    <br />
    <p style="margin:4px 0;"><strong>Aditya Jagtap</strong></p>
    <p style="margin:0;">Founder & CEO, Omnexa Global Trade</p>
    <p style="margin:4px 0;">📧 <a href="mailto:aditya.jagtap@omnexaglobal.com" style="color:#0066cc;">aditya.jagtap@omnexaglobal.com</a></p>
  </div>
</div>

    `
}