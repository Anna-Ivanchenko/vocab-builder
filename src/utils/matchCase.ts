const isUpperCase = (char: string) =>
  char !== char.toLowerCase() && char === char.toUpperCase();

export const matchCase = (text: string, sample: string): string => {
  if (!text || !sample) return text;

  const first = isUpperCase(sample[0])
    ? text[0].toUpperCase()
    : text[0].toLowerCase();

  return first + text.slice(1);
};