export const convertCurrencyStringToNumber = (currencyString: string) => {
  let modifiedString = currencyString.replace(/\./g, '');
  modifiedString = modifiedString.replace(/,/g, '.');
  return parseFloat(modifiedString);
}