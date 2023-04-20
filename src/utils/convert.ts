/** object to return {label, value}[] */
export const objectToArray = (object: {
  [key in string]: string;
}) => {
  return Object.entries(object).map(([key, value]) => ({
    label: value,
    value: key,
  }));
};
