const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, and message are required' 
      });
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Ruby\'s Hair Salon <onboarding@resend.dev>', // Update this with your verified domain
      to: ['ryeean16@gmail.com'], // Update with the Ruby's email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4a5a5;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <hr style="border: 1px solid #e0e0e0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the Ruby's Hair Salon contact form.
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

    console.log('Email sent successfully:', data);

    res.json({ 
      success: true, 
      message: 'Your message has been sent successfully!',
      emailId: data.id
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      details: error.message 
    });
  }
});

// Appointment request endpoint
app.post('/api/appointment', async (req, res) => {
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
      to: ['ryeean16@gmail.com'], // Update with the Ruby's email
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

    res.json({ 
      success: true, 
      message: 'Your appointment request has been sent successfully!',
      emailId: data.id
    });

  } catch (error) {
    console.error('Error sending appointment email:', error);
    res.status(500).json({ 
      error: 'Failed to send appointment request',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Resend API Key loaded: ${process.env.RESEND_API_KEY ? 'Yes' : 'No'}`);
  console.log(`API Key value: ${process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'Not set'}`);
});
