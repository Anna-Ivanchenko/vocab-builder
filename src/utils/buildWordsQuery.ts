import type { WordsFilters, WordsQuery } from "../types/words";

export const WORDS_PER_PAGE = 7;

export const buildWordsQuery = (
  { keyword, category, isIrregular }: WordsFilters,
  page: number,
): WordsQuery => {
  const query: WordsQuery = { page, limit: WORDS_PER_PAGE };

  if (keyword) query.keyword = keyword;
  if (category) query.category = category;
  if (category === "verb") query.isIrregular = isIrregular;

  return query;
};