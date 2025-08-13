export const useToastNotification = () => {
  const toast = useToast();

  const success = (message: string) => {
    toast.add({
      severity: 'success',
      summary: message,
      life: 3000,
    });
  };

  const error = (message: string) => {
    toast.add({
      severity: 'error',
      summary: message,
      life: 3000,
    });
  };

  const warning = (message: string) => {
    toast.add({
      severity: 'warn',
      summary: message,
      life: 3000,
    });
  };

  return {
    success,
    warning,
    error,
  };
};
