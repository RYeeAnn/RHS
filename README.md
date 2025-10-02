# Ruby's Hair Salon

A modern, responsive website for Ruby's Hair Salon with appointment booking and contact functionality.

## Features

- **Home Page**: Welcome section with call-to-action buttons
- **Services**: Haircut and styling services with pricing
- **Appointment Booking**: Online appointment request form with Resend email integration
- **Contact**: Contact form with Resend email integration
- **Multilingual**: English and Chinese language support
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Application

#### Option 1: Run both servers together (Recommended)
```bash
npm run dev
```
This will start both the Express server (port 5001) and React development server (port 3000) simultaneously.

#### Option 2: Run servers separately
```bash
# Terminal 1 - Start Express server
npm run server

# Terminal 2 - Start React development server
npm start
```

### Environment Variables
Make sure you have a `.env` file in the root directory with:
```
RESEND_API_KEY=your_resend_api_key_here
```

## Production Deployment

The application is configured for Vercel deployment with:
- API routes in `/api/` directory for serverless functions
- Build output in `/build` directory
- Automatic API routing for both contact and appointment forms

## API Endpoints

### Development (localhost:5001)
- `POST /api/contact` - Contact form submission
- `POST /api/appointment` - Appointment request submission

### Production (Vercel)
- `POST /api/contact` - Contact form submission
- `POST /api/appointment` - Appointment request submission

Both endpoints use Resend API to send emails to the salon owner.

## Project Structure

```
src/
├── components/          # Reusable React components
├── pages/              # Main page components
├── i18n/               # Internationalization files
└── App.tsx             # Main application component

api/                    # Vercel serverless functions
├── contact.js          # Contact form API
└── appointment.js      # Appointment form API

server/                 # Express server for development
└── index.js            # Server with API endpoints
```

## Technologies Used

- **Frontend**: React, TypeScript, SCSS
- **Backend**: Express.js, Node.js
- **Email**: Resend API
- **Deployment**: Vercel
- **Internationalization**: react-i18next
- **Routing**: React Router
