# Deployment Guide for Vercel

This guide explains how to deploy Ruby's Hair Salon to Vercel with full contact form functionality.

## 🚀 Quick Deploy

### 1. Push to GitHub

Make sure all your changes are committed and pushed:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import your GitHub repository
4. Vercel will auto-detect the settings

### 3. Configure Environment Variables

**CRITICAL:** Before deploying, add your environment variable in Vercel:

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add the following variable:

   | Name | Value |
   |------|-------|
   | `RESEND_API_KEY` | Your Resend API key from resend.com |

3. Make sure to add it for **Production**, **Preview**, and **Development** environments

### 4. Deploy

Click "Deploy" and Vercel will:
- Install dependencies with `--legacy-peer-deps` (configured in `.npmrc`)
- Build your React app
- Deploy serverless functions for the contact form API
- Make everything live! ✨

## 📧 Email Configuration

### Current Setup (Testing)
- **From:** `onboarding@resend.dev`
- **To:** `ryeean16@gmail.com`

With the test domain, emails can only be sent to your own email address.

### For Production (Send to Any Email)

1. **Verify Your Domain in Resend:**
   - Go to [resend.com/domains](https://resend.com/domains)
   - Add and verify your custom domain
   - Follow DNS setup instructions

2. **Update the API Function:**
   Edit `api/contact.js` line 50:
   ```javascript
   from: 'Ruby\'s Hair Salon <noreply@yourdomain.com>',
   ```

3. **Redeploy to Vercel**

## 🔧 API Endpoints

After deployment, your contact form will use:

- **Production:** `https://your-domain.vercel.app/api/contact`
- **Local Dev:** `http://localhost:5001/api/contact`

The code automatically detects the environment and uses the correct endpoint.

## ✅ Testing the Deployment

1. Wait for Vercel deployment to complete
2. Visit your live site
3. Go to the Contact page
4. Submit a test message
5. Check your email inbox at `ryeean16@gmail.com`

## 🐛 Troubleshooting

### Build fails with TypeScript errors
- The project uses TypeScript 5.9.3 (defined in `devDependencies`)
- `.npmrc` ensures `--legacy-peer-deps` is used
- If issues persist, check Vercel build logs

### Contact form doesn't work
- Verify `RESEND_API_KEY` is set in Vercel environment variables
- Check Vercel function logs under **Deployments** → **Functions**
- Make sure you're using a valid Resend API key

### Emails not received
- Check Resend dashboard for email logs
- Verify the "to" email in `api/contact.js`
- Check spam folder
- Remember: test domain only sends to your own email

## 📱 Local Development

For local development with the backend:

```bash
npm run dev
```

This runs both frontend (port 3000) and backend (port 5001).

## 🌍 Custom Domain

To use a custom domain:

1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Once verified, your site will be available at your domain

## 🔐 Security Notes

- Never commit `.env` file (it's in `.gitignore`)
- Always use environment variables in Vercel for secrets
- The serverless function automatically handles CORS
- API rate limiting is managed by Vercel

---

## 📋 Checklist Before Going Live

- [ ] Set `RESEND_API_KEY` in Vercel environment variables
- [ ] Update email recipient in `api/contact.js` if needed
- [ ] Test contact form on production URL
- [ ] Verify domain in Resend (for production emails)
- [ ] Update "from" email to use your domain
- [ ] Test English/Chinese language toggle
- [ ] Check mobile responsiveness
- [ ] Update contact information (phone, address, hours)

Your site is now ready for production! 🎊 