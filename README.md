# sh0tzbycorey - Photography & Videography Website

A modern, multi-page React website for a photography and videography business with booking and payment integration.

## Live Demo
[View Website](https://qbelkjgfkbk5y.ok.kimi.link)

## Features

### Pages
- **Home** - Hero section, featured services, testimonials, CTA
- **Services** - Filterable services (Photography, Videography, Editing, Design)
- **Portfolio** - Gallery with category and type filters
- **Booking** - 4-step booking flow with payment selection
- **Contact** - Contact form, FAQ, business info

### Services Included
**Videography:**
- Music Videos
- Prom & Homecoming
- Sports Media
- Events
- Corporate Events
- Wedding Videography

**Photography:**
- Portrait Photography
- Wedding Photography
- Family Photography
- Maternity & Newborn
- Event Photography
- Professional Headshots

**Editing & Design:**
- Video Editing
- Graphic Design

### Booking System
- 4-step booking process:
  1. Select Service & Package
  2. Choose Date & Time
  3. Enter Contact Info
  4. Payment Selection
- Payment methods: Card, PayPal, Cash App, Apple Pay
- 50% deposit required
- Order summary before checkout

## Tech Stack
- React 18 + TypeScript
- React Router (Multi-page navigation)
- Vite (Build tool)
- Tailwind CSS (Styling)
- shadcn/ui (UI Components)
- Lucide React (Icons)

## Project Structure
```
app/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Layout.tsx      # Main layout with nav & footer
│   │   └── ui/                  # shadcn/ui components
│   ├── pages/
│   │   ├── Home.tsx            # Home page
│   │   ├── Services.tsx        # Services listing
│   │   ├── Portfolio.tsx       # Portfolio gallery
│   │   ├── Booking.tsx         # Booking flow
│   │   ├── Contact.tsx         # Contact page
│   │   └── NotFound.tsx        # 404 page
│   ├── data/
│   │   └── services.ts         # Services data
│   ├── App.tsx                 # Router setup
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── dist/                        # Build output
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started (VS Code)

### 1. Open in VS Code
```bash
# Navigate to the project folder
cd app

# Open in VS Code
code .
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 4. Build for Production
```bash
npm run build
```
The build output will be in the `dist/` folder.

## Deploying to Railway

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sh0tzbycorey.git
   git push -u origin main
   ```

2. **Create Railway Project**
   - Go to [Railway](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Build Settings**
   Railway will auto-detect the Vite configuration. The build settings should be:
   - **Build Command:** `npm run build`
   - **Start Command:** (leave empty for static sites)
   - **Output Directory:** `dist`

4. **Add Custom Domain (Optional)**
   - In Railway dashboard, go to Settings
   - Click "Custom Domain"
   - Enter your domain and follow DNS instructions

### Option 2: Deploy with Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Initialize**
   ```bash
   railway login
   railway init
   ```

3. **Deploy**
   ```bash
   railway up
   ```

## Customization

### Edit Services
Open `src/data/services.ts` to modify:
- Service names and descriptions
- Package prices and features
- Add new services

### Change Colors
Edit `src/index.css`:
```css
:root {
  --primary: 14 100% 50%; /* Change this hue value */
}
```

### Update Contact Info
Edit `src/pages/Contact.tsx`:
- Email address
- Phone number
- Social media links

### Add Portfolio Items
Edit `src/pages/Portfolio.tsx`:
```typescript
const portfolioItems: PortfolioItem[] = [
  { id: 1, title: 'Your Project', category: 'photography', type: 'wedding', description: '...' },
  // Add more items
];
```

## Payment Integration

The booking system currently has a mock payment flow. To integrate real payments:

### Stripe Integration
1. Install Stripe:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

2. Add Stripe publishable key to environment variables

3. Replace the payment section in `src/pages/Booking.tsx` with Stripe Elements

### PayPal Integration
1. Install PayPal SDK:
   ```bash
   npm install @paypal/react-paypal-js
   ```

2. Add PayPal client ID to environment variables

## Environment Variables

Create a `.env` file for local development:
```
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_PAYPAL_CLIENT_ID=your_paypal_id
```

## License

This project is created for sh0tzbycorey. All rights reserved.

---

**Filmed & Photographed by sh0tzbycorey™**
