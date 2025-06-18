const dictionaries: { [key: string]: () => Promise<any> } = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
  ka: () => import('@/dictionaries/ka.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
    const loader = dictionaries[locale] || dictionaries.ka;
    return loader();
} 