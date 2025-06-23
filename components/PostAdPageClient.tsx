'use client';

import NewPostAdForm from '@/components/NewPostAdForm';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
};

export default function PostAdPageClient({ dictionary, lang }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{dictionary.postAdPage.title}</h1>
      <NewPostAdForm dictionary={dictionary.postAdForm} lang={lang} />
    </div>
  );
}
