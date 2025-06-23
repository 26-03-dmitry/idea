// Forcing a re-build to clear cache
import SignupPageClient from '@/components/SignupPageClient';
import { i18n } from '@/i18n.config';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function SignupPage() {
  return <SignupPageClient />;
} 