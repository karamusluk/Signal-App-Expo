export const prettifyErrors = (errors) => {
  let message = "";
  if (typeof errors === "object") {
    for (const key in errors) {
      message += `${errors[key]}\n`;
    }
    return message;
  }
  return errors;
};
