# Ruby's Hair Salon

A modern, elegant website for Ruby's Hair Salon built with React, TypeScript, and SCSS.

## 🌟 Features

- **Home Page**: Hero section with call-to-action and introduction
- **Services Page**: Grid of service cards with descriptions and pricing
- **Contact Page**: Contact form with email integration (Resend API)
- **Multi-language Support**: Toggle between English and Chinese (中文)
- **Responsive Design**: Mobile-first approach with elegant styling
- **Premium Aesthetic**: Soft blush color palette with elegant typography
- **Email Notifications**: Receive contact form submissions via email

## 🎨 Design

- **Color Palette**: Soft blush (#d4a5a5) and beige tones
- **Typography**: 
  - Headings: Playfair Display (serif)
  - Body: Inter (sans-serif)
- **Style**: Minimal, elegant, boutique aesthetic

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Resend account (for contact form emails)

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Create a `.env` file in the root directory:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   PORT=5001
   ```
   
   **Note:** We use port 5001 because macOS uses port 5000 for AirPlay Receiver.

4. Update the email recipient in `server/index.js` (line 38):
   ```javascript
   to: ['your-email@example.com'], // Replace with your email
   ```

### Running the Development Server

Run both frontend and backend:
```bash
npm run dev
```

The frontend will open at [http://localhost:3000](http://localhost:3000)
The backend API runs at [http://localhost:5001](http://localhost:5001)

Or run them separately:
```bash
npm start        # Frontend only
npm run server   # Backend only
```

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx
│   ├── Navbar.scss
│   ├── Footer.tsx
│   └── Footer.scss
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Home.scss
│   ├── Services.tsx
│   ├── Services.scss
│   ├── Contact.tsx
│   └── Contact.scss
├── App.tsx             # Main app with routing
├── App.css
├── index.tsx
└── index.css           # Global styles
```

## 🔧 Customization

### Configure Email Service

1. Get a Resend API key from [resend.com](https://resend.com)
2. Add it to your `.env` file
3. Update recipient email in `server/index.js`
4. (Optional) Verify your domain in Resend for production use

See `server/README.md` for detailed instructions.

### Update Contact Information

Edit the following files to update contact details:

- `src/components/Footer.tsx` - Footer phone number
- `src/pages/Home.tsx` - Hero CTA button
- `src/pages/Contact.tsx` - Contact information
- `src/i18n/locales/en.json` & `zh.json` - All text content

### Update Services

Edit the translation files to modify services:
- `src/i18n/locales/en.json` - English services
- `src/i18n/locales/zh.json` - Chinese services

### Add More Languages

1. Create a new translation file in `src/i18n/locales/` (e.g., `es.json`)
2. Add the language to `src/i18n/config.ts`
3. Update the language toggle in `src/components/Navbar.tsx`

## 🎯 Next Steps

- [ ] Update contact information with actual details
- [ ] Add booking functionality
- [ ] Set up analytics
- [ ] Deploy to hosting platform
- [ ] Verify domain in Resend for production emails

## 📱 Mobile Responsive

The website is fully responsive and optimized for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **SCSS** - Styling with nested syntax
- **i18next** - Internationalization
- **Google Fonts** - Playfair Display & Inter

### Backend
- **Express** - Web server
- **Resend** - Email delivery service
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Ruby's Hair Salon
