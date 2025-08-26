# Deployment Guide

## Quick Docker Deployment

### 1. Clone Repository
```bash
git clone https://github.com/rodsct/saasiav4.git
cd saasiav4
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.production.example .env

# Edit with your production values
nano .env
```

### 3. Deploy with Docker Compose
```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Or development with adminer
docker-compose up -d
```

### 4. Database Setup
```bash
# Access the app container
docker exec -it saasiav4-app-1 bash

# Generate Prisma client and push schema
npm run db:generate
npm run db:push
```

## Environment Variables Required

### Essential Variables
- `NEXTAUTH_URL`: Your domain (e.g., https://yourdomain.com)
- `NEXTAUTH_SECRET`: Secure random string (min 32 characters)
- `POSTGRES_PASSWORD`: Secure database password
- `POSTGRES_DB`: Database name (default: saas_personal_agent)

### Service Integrations
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`: Stripe payments
- `RESEND_API_KEY` & `FROM_EMAIL`: Email service

## Easypanel Deployment

1. **Create New Service**
   - Choose "Docker Compose"
   - Connect GitHub repository
   - Use `docker-compose.prod.yml`

2. **Set Environment Variables**
   - Add all variables from `.env.production.example`
   - Configure domain and SSL

3. **Deploy**
   - Easypanel will build and deploy automatically
   - Database will be created and ready

## Manual Server Deployment

### Prerequisites
- Docker & Docker Compose
- Domain with SSL certificate
- Reverse proxy (nginx/traefik)

### Steps
1. Clone repository
2. Configure environment variables
3. Run `docker-compose -f docker-compose.prod.yml up -d`
4. Setup reverse proxy to port 3000
5. Configure SSL certificate

## Health Checks

### Application Health
- **App**: http://localhost:3000
- **Database**: PostgreSQL on port 5432
- **Admin Panel**: http://localhost:8080 (if enabled)

### Verify Services
```bash
# Check running containers
docker-compose ps

# View logs
docker-compose logs app
docker-compose logs db

# Test database connection
docker exec -it saasiav4-db-1 psql -U postgres -d saas_personal_agent
```

## Production Checklist

### Security
- [ ] Secure NEXTAUTH_SECRET (32+ characters)
- [ ] Strong database password
- [ ] HTTPS/SSL configured
- [ ] Environment variables secured
- [ ] Disable Adminer in production

### Services Setup
- [ ] Google OAuth configured
- [ ] Stripe webhooks configured
- [ ] Resend domain verified
- [ ] Database backups configured

### Performance
- [ ] CDN configured for static assets
- [ ] Database performance monitoring
- [ ] Application monitoring
- [ ] Log aggregation

## Troubleshooting

### Common Issues
1. **Database Connection**: Check DATABASE_URL format
2. **Build Fails**: Verify Node.js version compatibility
3. **Auth Issues**: Confirm NEXTAUTH_URL matches domain
4. **Stripe Webhooks**: Verify webhook endpoint URL

### Logs
```bash
# Application logs
docker-compose logs -f app

# Database logs
docker-compose logs -f db

# All services
docker-compose logs -f
```

## Updates and Maintenance

### Update Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build
```

### Database Migrations
```bash
# Access app container
docker exec -it saasiav4-app-1 bash

# Run migrations
npm run db:migrate
```

### Backup Database
```bash
# Create backup
docker exec saasiav4-db-1 pg_dump -U postgres saas_personal_agent > backup.sql

# Restore backup
docker exec -i saasiav4-db-1 psql -U postgres saas_personal_agent < backup.sql
```

## Monitoring

### Key Metrics
- Application response times
- Database performance
- Error rates
- Subscription events
- Email delivery rates

### Recommended Tools
- Application: Vercel Analytics, Sentry
- Database: PostgreSQL logs, pgAdmin
- Infrastructure: Docker stats, system monitoring

---

## Support

For deployment issues:
1. Check logs first
2. Verify environment variables
3. Confirm service integrations
4. Test with development environment