import type { RootState } from '../store';

export const selectWords = (state: RootState) => state.words.items;
export const selectCategories = (state: RootState) => state.words.categories;
export const selectFilters = (state: RootState) => state.words.filters;
export const selectPage = (state: RootState) => state.words.page;
export const selectTotalPages = (state: RootState) => state.words.totalPages;
export const selectTotalCount = (state: RootState) => state.words.totalCount;
export const selectWordsLoading = (state: RootState) => state.words.isLoading;
export const selectWordsError = (state: RootState) => state.words.error;