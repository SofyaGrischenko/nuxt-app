import { handleGetLanguages, handleUpdateLanguage } from '~/service/details';
import type { LanguageInput, LanguageOtput } from '~/types/form.types';

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
    if (languages.value.length > 0) return;

    try {
      const response = await handleGetLanguages();

      if (response.languages) {
        languages.value = response.languages;
      }
    } catch (error) {
      console.error('failed to get languages', error);
    }
  };

  const updateLanguage = async (input: LanguageInput) => {
    const originalLang = languages.value.find((l) => l.id === input.languageId);

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
      const response = await handleUpdateLanguage(input);

      console.log('response', response);

      success('Language has been updated');
    } catch (e) {
      console.error('failed to update language', e);
      error('Failed to update language');
    }
  };

  return {
    searchQuery,
    languages: languagesToShow,
    filteredLanguages,
    loadMore,
    getLanguages,
    updateLanguage,
  };
};
