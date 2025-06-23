'use client';

import NewPostAdForm from '@/components/NewPostAdForm';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';
import Link from 'next/link';

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
};

export default function PostAdPageClient({ dictionary, lang }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-6">
        <Link 
          href={`/${lang}`}
          className="absolute left-0 top-0 text-primary-600 hover:text-primary-800 font-medium"
        >
          ← {dictionary.postAdPage.home || 'Главная'}
        </Link>
        <h1 className="text-3xl font-bold text-center">{dictionary.postAdPage.title}</h1>
      </div>
      <NewPostAdForm dictionary={dictionary.postAdForm} lang={lang} />
    </div>
  );
}
