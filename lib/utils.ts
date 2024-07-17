import Toast from "react-native-toast-message";

/**
 * Converts a number or string input to a Naira formatted string.
 * @param input - The number or string to be formatted.
 * @returns The formatted Naira string.
 */
export const formatToNaira = (input: number | string): string => {
  const number = typeof input === 'string' ? parseFloat(input.replace(/,/g, '')) : input;

  if (isNaN(number)) {
    return String(input)
  }

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(number);
};