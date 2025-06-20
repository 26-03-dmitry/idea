import { getDictionary } from '@/lib/dictionary'
import Header from '@/components/Header'
import PostAdForm from '@/components/PostAdForm'

// Мы делаем страницу асинхронной, чтобы получить словарь
export default async function PostAdPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header lang={lang} dict={dict.header} />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-900 mb-8 text-center">
            {dict.postAdPage.title}
          </h1>
          <PostAdForm dict={dict} lang={lang} />
        </div>
      </main>
    </div>
  )
} 