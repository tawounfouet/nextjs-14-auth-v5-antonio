# Development Setup Guide

## Quick Start for Development

This project now includes automatic fallbacks for development without external services.

### 🗄️ Database Options

**Option 1: SQLite (Default - No setup required)**
- Automatically used when no PostgreSQL connection is available
- Creates `dev.db` file in your project
- Perfect for local development

**Option 2: PostgreSQL (Optional)**
- Update `.env.local` with your PostgreSQL credentials:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/nextjs_auth_db"
DIRECT_URL="postgresql://username:password@localhost:5432/nextjs_auth_db"
```

### 📧 Email Service Options

**Option 1: Mock Emails (Default - No setup required)**
- Emails are logged to the console during development
- No external service needed
- Perfect for testing authentication flows

**Option 2: Real Email Service (Optional)**
- Get a free API key from [Resend](https://resend.com/api-keys)
- Add to `.env.local`:
```bash
RESEND_API_KEY=your_resend_api_key_here
```

### 🔑 OAuth Providers (Optional)

**GitHub OAuth:**
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3001/api/auth/callback/github`
4. Add credentials to `.env.local`:
```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Set redirect URI: `http://localhost:3001/api/auth/callback/google`
4. Add credentials to `.env.local`:
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Development Commands

```bash
# Start development server
npm run dev

# Start without database setup (if already configured)
npm run dev:force

# Database management
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio to view/edit data
npm run db:migrate   # Run database migrations
```

## Testing Email Flows

When testing features that send emails (registration, password reset, 2FA):

1. **With Mock Emails (Default):** Check your terminal/console for email content
2. **With Real Emails:** Check your email inbox

Example console output for mock emails:
```
📧 MOCK EMAIL SENT (Development Mode)
================================
Type: Email Verification
To: user@example.com
Content: Verification link: http://localhost:3001/auth/new-verification?token=abc123
================================
```

## Development Tips

- Use SQLite for quick local development
- Use PostgreSQL when you need production-like features
- Mock emails are perfect for testing auth flows
- Real emails are useful when testing with multiple devices/people

## Troubleshooting

If you see "Missing API key" errors:
- Make sure you're using the mock email service (default)
- Or add your Resend API key to `.env.local`

If you see database connection errors:
- The system will automatically fall back to SQLite
- Check your PostgreSQL connection if you're trying to use it
