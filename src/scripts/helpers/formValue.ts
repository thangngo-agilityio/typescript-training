export const getFormValues = <T>(form: HTMLFormElement): T => {
  const formValues = {} as T;
  const data = new FormData(form);

  for (const [key, value] of data) {
    (formValues[key as keyof T] as string) = (value as string).trim();
  }

  return formValues;
}
