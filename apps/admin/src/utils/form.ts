export const createFormData = <T extends {}>(data: T) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as string);
  }

  return formData;
};
