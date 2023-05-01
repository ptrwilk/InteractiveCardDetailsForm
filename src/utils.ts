//Format card number to be: "0000 0000 0000 0000"
export const formatCardNumber = (cardNumber?: string): string => {
  if (cardNumber !== undefined && cardNumber.length > 16) {
    throw new Error("card number can be maximum 16 in length.");
  }

  const length = cardNumber?.length ?? 16;

  return groupByElementsCount(padStr(cardNumber, length, "0").split(""), 4)
    .map((chunk) => chunk.join(""))
    .join(" ");
};

//Eg. ["1","2","3","4"], 2 -> [["1","2"], ["3","4"]]
const groupByElementsCount = (array: string[], count: number): string[][] => {
  const result = array.reduce((acc: string[][], _: string, idx: number) => {
    if (idx % count === 0) {
      acc.push(array.slice(acc.length * count, idx + count));
    }
    return acc;
  }, []);

  return result;
};

//Eg. "1234", 10, "0" -> "1234000000"
export const padStr = (
  str: string | undefined,
  maxLength: number,
  padSign: string
): string => (str ?? "").padEnd(maxLength, padSign);

//Eg. "1", 3 -> "001"
export const zeroPad = (value: any | undefined, maxLength: number) =>
  (value?.toString() ?? "").padStart(maxLength, "0");

export const isNumber = (value?: any) => {
  return /^\d+$/.test(value);
};
