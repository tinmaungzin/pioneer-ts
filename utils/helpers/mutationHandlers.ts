export const handleSuccess = (message: any, setOpen: any, toast: any) => {
  setOpen(false);
  toast({
    description: message,
  });
};

export const handleError = (error: any, toast: any) => {
  toast({
    variant: "destructive",
    description: error.message,
  });
};
