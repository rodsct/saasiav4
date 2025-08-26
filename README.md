# Personal Agent SaaS Platform

A comprehensive SaaS platform for AI-powered personal assistance with subscription management, built with Next.js, TypeScript, and modern web technologies.

## Features

- **🤖 AI-Powered Personal Agent**: Intelligent conversations and task automation
- **🌍 Multi-language Support**: English and Spanish with next-intl
- **🎨 Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **🌗 Theme Support**: Dark mode (primary) and light mode with next-themes
- **🔐 Authentication**: NextAuth.js with Google OAuth and email/password
- **💳 Subscription Management**: Stripe integration for payments and billing
- **📧 Transactional Emails**: Resend integration with React Email templates
- **📊 Database**: PostgreSQL with Prisma ORM
- **🐳 Containerized**: Docker and Docker Compose ready

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-themes
- next-intl

### Backend
- Next.js API Routes
- NextAuth.js
- Prisma ORM
- PostgreSQL

### Services
- Stripe (Payments)
- Resend (Emails)
- React Email (Templates)

### DevOps
- Docker
- Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL
- Docker & Docker Compose (optional)

### Installation

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd saasiav4
   npm install
   ```

2. **Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Or run migrations
   npm run db:migrate
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

### Docker Setup

1. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - Next.js app on http://localhost:3000
   - PostgreSQL database on port 5432
   - Adminer (database admin) on http://localhost:8080

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/saas_personal_agent"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_your-key"
STRIPE_PUBLISHABLE_KEY="pk_test_your-key"
STRIPE_WEBHOOK_SECRET="whsec_your-secret"

# Resend
RESEND_API_KEY="re_your-key"
FROM_EMAIL="noreply@yourdomain.com"
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── stripe.ts         # Stripe utilities
│   ├── resend.ts         # Email utilities
│   └── utils.ts          # General utilities
├── messages/              # i18n translations
├── emails/                # React Email templates
└── types/                 # TypeScript type definitions

prisma/
└── schema.prisma          # Database schema

docker-compose.yml         # Docker services
Dockerfile                 # App container
```

## Available Scripts

```bash
# Development
npm run dev                # Start development server
npm run build             # Build for production
npm run start             # Start production server

# Database
npm run db:generate       # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio

# Email Development
npm run email:dev        # Start email development server

# Linting
npm run lint             # Run ESLint
```

## Key Features Implementation

### Authentication
- Email/password with bcrypt hashing
- Google OAuth integration
- Protected routes with middleware
- Session management with NextAuth.js

### Subscriptions
- Stripe Checkout integration
- Webhook handling for subscription events
- Subscription status tracking
- Billing history management

### Email System
- React Email templates
- Dynamic email content with variables
- Template management in database
- Resend integration for delivery

### Internationalization
- Multi-language support (English/Spanish)
- Locale-based routing
- Automatic locale detection
- RTL support ready

### UI/UX
- Responsive design
- Dark/light theme toggle
- Accessible components
- Modern design system

## Deployment

### Easypanel (Recommended)
1. Connect your repository
2. Set environment variables
3. Deploy with Docker configuration

### Manual Deployment
1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Deploy to your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact support team

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.