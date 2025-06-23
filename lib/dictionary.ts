const dictionaries: { [key: string]: () => Promise<any> } = {
  en: () => import('@/dictionaries/en.json'),
  ru: () => import('@/dictionaries/ru.json'),
  ka: () => import('@/dictionaries/ka.json'),
}

export const getDictionary = async (locale: string) => {
    const loader = dictionaries[locale] || dictionaries.ka;
    return loader();
} 