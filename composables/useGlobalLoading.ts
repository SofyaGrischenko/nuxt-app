export const isLoading = ref(true);

export const useGlobalLoading = () => {
  return {
    isLoading,
  };
};
