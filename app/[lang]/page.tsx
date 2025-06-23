    import { getDictionary } from '@/lib/dictionary';
    import PostAdPageClient from '@/components/PostAdPageClient';

    export async function generateStaticParams() {
      return [{ lang: 'en' }, { lang: 'ru' }, { lang: 'ka' }];
    }

    export default async function PostAdPage({ params: { lang } }: { params: { lang:string } }) {
      const dict = await getDictionary(lang);
      return <PostAdPageClient lang={lang} dict={dict} />;
    }
