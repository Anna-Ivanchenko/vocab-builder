import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { getErrorMessage } from '../../utils/getErrorMessage';
import type {
  DeleteWordResponse,
  EditWordPayload,
  Statistics,
  Word,
  WordBody,
  WordsQuery,
  WordsResponse,
} from '../../types/words';

export const fetchCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('words/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<string[]>('/words/categories');
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchOwnWords = createAsyncThunk<
  WordsResponse,
  WordsQuery,
  { rejectValue: string }
>('words/fetchOwn', async (query, { rejectWithValue }) => {
  try {
    const { data } = await api.get<WordsResponse>('/words/own', {
      params: query,
    });
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchAllWords = createAsyncThunk<
  WordsResponse,
  WordsQuery,
  { rejectValue: string }
>('words/fetchAll', async (query, { rejectWithValue }) => {
  try {
    const { data } = await api.get<WordsResponse>('/words/all', {
      params: query,
    });
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchStatistics = createAsyncThunk<
  Statistics,
  void,
  { rejectValue: string }
>('words/fetchStatistics', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Statistics>('/words/statistics');
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createWord = createAsyncThunk<
  Word,
  WordBody,
  { rejectValue: string }
>('words/create', async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post<Word>('/words/create', body);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const addWord = createAsyncThunk<Word, string, { rejectValue: string }>(
  'words/add',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.post<Word>(`/words/add/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const editWord = createAsyncThunk<
  Word,
  EditWordPayload,
  { rejectValue: string }
>('words/edit', async ({ id, body }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch<Word>(`/words/edit/${id}`, body);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteWord = createAsyncThunk<
  DeleteWordResponse,
  string,
  { rejectValue: string }
>('words/delete', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.delete<DeleteWordResponse>(
      `/words/delete/${id}`,
    );
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});