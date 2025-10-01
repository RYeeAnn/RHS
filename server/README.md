# Server Setup for Contact Form

This backend server handles contact form submissions and sends emails using Resend API.

## Environment Variables

Create a `.env` file in the root directory with the following:

```env
RESEND_API_KEY=your_resend_api_key_here
PORT=5001
```

**Note:** We use port 5001 because macOS uses port 5000 for AirPlay Receiver by default.

## Getting Your Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use their testing domain for development)
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

## Configuring Email Recipients

Edit `server/index.js` line 38 to set where form submissions are sent:

```javascript
to: ['your-email@example.com'], // Replace with your actual email
```

## Configuring Sender Email

Edit `server/index.js` line 37 to set the "from" email:

```javascript
from: 'Ruby\'s Hair Salon <onboarding@resend.dev>', // Update with your verified domain
```

**Note:** For production, you'll need to verify your domain in Resend. During development, you can use `onboarding@resend.dev`.

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

This runs both the frontend and backend concurrently.

### Backend only:
```bash
npm run server
```

### Frontend only:
```bash
npm start
```

## Testing the Contact Form

1. Make sure both frontend and backend are running
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check your email for the submission

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/contact` - Submit contact form
  - Required fields: `name`, `email`, `message`
  - Optional fields: `phone`

## Troubleshooting

### Form submission fails
- Check that the backend server is running on port 5001
- Verify your `RESEND_API_KEY` is set correctly in `.env`
- Check browser console for error messages
- If you see port conflicts, macOS uses port 5000 for AirPlay - we use 5001 instead

### Emails not received
- Verify your Resend API key is valid
- Check that the recipient email is correct in `server/index.js`
- Look at server logs for error messages
- Check Resend dashboard for email logs 