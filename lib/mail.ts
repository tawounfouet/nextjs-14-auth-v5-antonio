import { Resend } from 'resend';

// Check if we're in development and don't have a Resend API key
const isDevelopment = process.env.NODE_ENV === 'development';
const hasResendKey = !!process.env.RESEND_API_KEY;

// Only initialize Resend if we have an API key
const resend = hasResendKey ? new Resend(process.env.RESEND_API_KEY) : null;

const domain = process.env.NEXT_PUBLIC_APP_URL;

// Mock email sending for development
const sendMockEmail = (type: string, email: string, content: string) => {
  console.log('\n📧 MOCK EMAIL SENT (Development Mode)');
  console.log('================================');
  console.log(`Type: ${type}`);
  console.log(`To: ${email}`);
  console.log(`Content: ${content}`);
  console.log('================================\n');
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  if (!hasResendKey && isDevelopment) {
    sendMockEmail('2FA Code', email, `Your 2FA code: ${token}`);
    return;
  }

  if (!resend) {
    throw new Error('Resend API key is required for email sending');
  }

  await resend.emails.send({
    from: 'mytools@my-tools.ai',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  if (!hasResendKey && isDevelopment) {
    sendMockEmail('Password Reset', email, `Reset link: ${resetLink}`);
    return;
  }

  if (!resend) {
    throw new Error('Resend API key is required for email sending');
  }

  await resend.emails.send({
    from: 'mytools@my-tools.ai',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  if (!hasResendKey && isDevelopment) {
    sendMockEmail('Email Verification', email, `Verification link: ${confirmLink}`);
    return;
  }

  if (!resend) {
    throw new Error('Resend API key is required for email sending');
  }

  await resend.emails.send({
    from: 'mytools@my-tools.ai',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
