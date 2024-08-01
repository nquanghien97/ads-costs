export const convertCurrencyStringToNumber = (currencyString: string) => {
  let modifiedString = currencyString.replace(/\./g, '');
  modifiedString = modifiedString.replace(/,/g, '.');
  return parseFloat(modifiedString);
}

export const formatCurrency = (number: number | string) => {
  if(typeof number === 'string') number = Number(number);
  const decPlaces = 2;
  const decSep = ",";
  const thouSep = ".";
  
  const sign = number < 0 ? "-" : "";
  const absNumber = Math.abs(Number(number) || 0);
  const i = String(Math.trunc(absNumber)).padStart(1, "0");
  const j = i.length > 3 ? i.length % 3 : 0;

  return sign +
      (j ? i.slice(0, j) + thouSep : "") +
      i.slice(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSep) +
      (decPlaces ? decSep + Math.abs(absNumber - parseInt(i)).toFixed(decPlaces).slice(2) : "");
}