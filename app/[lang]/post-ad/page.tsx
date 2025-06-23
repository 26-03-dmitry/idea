import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/i18n.config'
import PostAdPageClient from '@/components/PostAdPageClient'
import { i18n } from '@/i18n.config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function PostAdPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang)
  return <PostAdPageClient dictionary={dictionary} lang={lang} />
} 