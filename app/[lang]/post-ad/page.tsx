import Header from '@/components/Header';
import PostAdForm from '@/components/PostAdForm';
import { getDictionary } from '@/lib/dictionary';

// Мы делаем страницу асинхронной, чтобы получить словарь
export default async function PostAdPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict.header} />
      <main className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <PostAdForm />
        </div>
      </main>
    </>
  );
} 