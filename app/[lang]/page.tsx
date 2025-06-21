import { getDictionary } from '@/lib/dictionary'
import HomePageClient from '@/components/HomePageClient'

export async function generateStaticParams() {
  const locales = ['en', 'ru', 'ka'];
  return locales.map((locale) => ({
    lang: locale,
  }));
}

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang);

  return <HomePageClient dict={dict} lang={lang} />
} 