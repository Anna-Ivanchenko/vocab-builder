import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  addWord,
  createWord,
  deleteWord,
  editWord,
  fetchAllWords,
  fetchCategories,
  fetchOwnWords,
  fetchStatistics,
} from './operations';
import { logout } from '../auth/operations';
import type { Word, WordsFilters } from '../../types/words';

interface WordsState {
  items: Word[];
  categories: string[];
  filters: WordsFilters;
  page: number;
  totalPages: number;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: WordsState = {
  items: [],
  categories: [],
  filters: { keyword: '', category: '', isIrregular: false },
  page: 1,
  totalPages: 1,
  totalCount: 0,
  isLoading: false,
  error: null,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setFilters(state, { payload }: PayloadAction<Partial<WordsFilters>>) {
      state.filters = { ...state.filters, ...payload };
      state.page = 1;
    },
    setPage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
      state.page = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      .addCase(fetchStatistics.fulfilled, (state, { payload }) => {
        state.totalCount = payload.totalCount;
      })
      .addCase(editWord.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(word => word._id === payload._id);
        if (index !== -1) state.items[index] = payload;
      })
      .addCase(deleteWord.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(word => word._id !== payload.id);
        state.totalCount -= 1;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState)
      .addMatcher(isAnyOf(createWord.fulfilled, addWord.fulfilled), state => {
        state.totalCount += 1;
      })
      .addMatcher(
        isAnyOf(fetchOwnWords.fulfilled, fetchAllWords.fulfilled),
        (state, { payload }) => {
          state.items = payload.results;
          state.totalPages = payload.totalPages || 1;
          state.isLoading = false;
        },
      )
      .addMatcher(
        isAnyOf(fetchOwnWords.pending, fetchAllWords.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(fetchOwnWords.rejected, fetchAllWords.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload ?? 'Something went wrong';
        },
      );
  },
});

export const { setFilters, setPage, resetFilters } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;