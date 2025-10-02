const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://rubys.vercel.app',
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

module.exports = async (req, res) => {
  // Handle CORS
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || origin?.includes('.vercel.app')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, service, date, time, notes } = req.body;

    // Validate required fields
    if (!name || !phone || !service || !date || !time) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, phone, service, date, and time are required' 
      });
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Ruby\'s Hair Salon <onboarding@resend.dev>', // Update this with your verified domain
      to: ['ryeean16@gmail.com'], // Your email
      subject: `New Appointment Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4a5a5;">New Appointment Request</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Preferred Date:</strong> ${date}</p>
            <p><strong>Preferred Time:</strong> ${time}</p>
            ${notes ? `
            <hr style="border: 1px solid #e0e0e0;" />
            <p><strong>Additional Notes:</strong></p>
            <p style="white-space: pre-wrap;">${notes}</p>
            ` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the Ruby's Hair Salon appointment request form.
          </p>
        </div>
      `,
    });

    // Check if the email was actually sent successfully
    if (data.error) {
      console.error('Resend API Error:', data.error);
      return res.status(500).json({ 
        error: 'Failed to send email',
        details: data.error.message || 'Email service error'
      });
    }

    console.log('Appointment email sent successfully:', data);

    return res.status(200).json({ 
      success: true, 
      message: 'Your appointment request has been sent successfully!',
      emailId: data.id
    });

  } catch (error) {
    console.error('Error sending appointment email:', error);
    return res.status(500).json({ 
      error: 'Failed to send appointment request',
      details: error.message 
    });
  }
};
