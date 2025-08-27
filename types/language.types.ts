export interface BaseLanguage {
  iso2: string;
  name: string;
  native_name: string;
}

export type LanguageOtput = BaseLanguage & { id: string };
export type LanguageInput = BaseLanguage & { languageId: string };
