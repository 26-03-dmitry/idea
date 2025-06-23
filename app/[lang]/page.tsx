import { getDictionary } from '@/lib/dictionary'
import HomePageClient from '@/components/HomePageClient'
import { i18n, type Locale } from '@/i18n.config'

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)
  return <HomePageClient dict={dictionary} lang={lang} />
}
