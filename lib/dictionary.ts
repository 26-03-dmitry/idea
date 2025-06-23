const dictionaries: { [key: string]: () => Promise<any> } = {
  en: () => import('@/dictionaries/en.json'),
  ru: () => import('@/dictionaries/ru.json'),
  ka: () => import('@/dictionaries/ka.json'),
}

export const getDictionary = async (locale: string) => {
    const loader = dictionaries[locale] || dictionaries.ka;
    const dictionaryModule = await loader();
    // We need to ensure we're passing a plain object, not a module object.
    // The JSON.parse(JSON.stringify(...)) trick is a reliable way to do this.
    return JSON.parse(JSON.stringify(dictionaryModule));
} 