import {
  handleCreateLanguage,
  handleDeleteLang,
  handleGetLanguages,
  handleUpdateLanguage,
} from '~/service/details';
import type {
  BaseLanguage,
  LanguageInput,
  LanguageOtput,
} from '~/types/language.types';

export const useLanguages = () => {
  const languages = useState<LanguageOtput[]>('languages', () => []);

  const { success, warning, error } = useToastNotification();

  const searchQuery = ref('');
  const pagesToShow = ref(1);
  const pageSize = 20;

  const filteredLanguages = computed(() => {
    const search = searchQuery.value.trim().toLowerCase();
    if (!search) {
      return languages.value;
    }
    return languages.value.filter((lang) =>
      lang.name?.toLowerCase().includes(search)
    );
  });

  const languagesToShow = computed(() =>
    filteredLanguages.value.slice(0, pagesToShow.value * pageSize)
  );

  const loadMore = () => pagesToShow.value++;

  const getLanguages = async () => {
    if (languages.value.length !== 0) return;
    try {
      const response = await handleGetLanguages();

      if (response.languages) {
        languages.value = [...response.languages];
      }
    } catch (e) {
      console.error('failed to get languages', e);
      error('Failed to load languages');
    }
  };

  const updateLanguage = async (input: LanguageInput) => {
    const originalLangIndex = languages.value.findIndex(
      (s) => s.id === input.languageId
    );
    if (originalLangIndex === -1) return;
    const originalLang = languages.value[originalLangIndex];

    if (!originalLang) {
      return;
    }

    const hasChanges =
      originalLang.name !== input.name ||
      originalLang.iso2 !== input.iso2 ||
      originalLang.native_name !== input.native_name;

    if (!hasChanges) {
      warning('No information to update');
      return;
    }

    try {
      await handleUpdateLanguage(input);

      languages.value.splice(originalLangIndex, 1, {
        ...originalLang,
        name: input.name,
        iso2: input.iso2,
        native_name: input.native_name,
      });

      success('Language has been updated');
    } catch (e) {
      console.error('failed to update language', e);
      error('Failed to update language');
    }
  };

  const createLang = async (input: BaseLanguage) => {
    try {
      const newLang = await handleCreateLanguage(input);

      if (newLang.createLanguage) {
        languages.value.push(newLang.createLanguage);
        success('New language has been created');
      }
    } catch (e) {
      console.error('failed to create language', e);
      error('Failed to create language');
    }
  };

  const deleteLanguage = async (input: string) => {
    try {
      await handleDeleteLang(input);

      const index = languages.value.findIndex((s) => s.id === input);
      if (index !== -1) {
        languages.value.splice(index, 1);
      }

      success('Language has been deleted');
    } catch (e) {
      console.error('failed to delete language', e);
      error('Failed to delete language');
    }
  };

  return {
    searchQuery,
    languages: languagesToShow,
    filteredLanguages,
    loadMore,
    getLanguages,
    updateLanguage,
    createLang,
    deleteLanguage,
  };
};
