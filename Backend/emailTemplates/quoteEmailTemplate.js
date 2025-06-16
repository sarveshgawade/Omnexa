export const quoteEmailTemplate = (quoteDetails) => {

    return `
    
        <div style="max-width:600px; margin:auto; font-family:Arial, sans-serif; background-color:#ffffff; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
  <div style="background-color:#f3f3f3; padding:20px; text-align:center;">
    <img src="https://res.cloudinary.com/dcehb4nl1/image/upload/v1750073722/omnexa_logo_d47yf9.jpg" alt="Omnexa Global Trade" style="width:160px; margin-bottom:10px;" />
    <h2 style="margin:10px 0; color:#333;">New Quote Request Received</h2>
  </div>

  <div style="padding:20px;">
    <p style="font-size:16px; color:#555;">Dear Aditya,</p>

    <p style="font-size:16px; color:#555; line-height:1.6;">
      A new quote request has been submitted on the Omnexa Global Trade platform. Here are the details:
    </p>

    <table style="width:100%; border-collapse:collapse; margin-top:15px;">
      <tbody>
        <tr><td style="padding:8px; font-weight:bold;">Contact Person</td><td style="padding:8px;">${quoteDetails.contactPersonName || 'N/A'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Company Name</td><td style="padding:8px;">${quoteDetails.companyName || 'N/A'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Email</td><td style="padding:8px;">${quoteDetails.companyEmail || 'N/A'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Mobile</td><td style="padding:8px;">${quoteDetails.mobileNumber || 'N/A'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Address</td><td style="padding:8px;">${quoteDetails.address || 'N/A'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Country</td><td style="padding:8px;">${quoteDetails.country || 'N/A'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Delivery Location</td><td style="padding:8px;">${quoteDetails.deliveryLocation || 'N/A'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Product </td><td style="padding:8px;">${quoteDetails.productName}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Quantity Required</td><td style="padding:8px;">${quoteDetails.requiredQty || 'N/A'}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">Urgent</td><td style="padding:8px;">${quoteDetails.isUrgent ? 'Yes' : 'No'}</td></tr>
      </tbody>
    </table>

    <p style="font-size:16px; color:#555; line-height:1.6; margin-top:20px;">
      Please log in to the admin dashboard to view and process this quote request.
    </p>
  </div>

  <div style="background-color:#f3f3f3; padding:20px; font-size:14px; color:#444;">
    <p style="margin:0;">Omnexa Global Trade</p>
    <p style="margin:4px 0;">📧 <a href="mailto:aditya.jagtap@omnexaglobal.com" style="color:#0066cc;">aditya.jagtap@omnexaglobal.com</a></p>
    <p style="margin:4px 0;">🌐 <a href="https://www.omnexaglobal.com" style="color:#0066cc;">www.omnexaglobal.com</a></p>
  </div>
</div>

    `
}