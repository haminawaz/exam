const dictionary = {
    english: () => import("../dictionary/english.json").then((r) => r.default),
    french: () => import("../dictionary/french.json").then((r) => r.default),
  };
  export const getDictionary = async (lang) => {
    return await dictionary[lang]();
  };
  