import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { getErrorMessage } from '../../utils/getErrorMessage';
import type { AnswerResult, Task, TasksResponse } from '../../types/training';

export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>('training/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<TasksResponse>('/words/tasks');
    return data.tasks;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const sendAnswers = createAsyncThunk<
  AnswerResult[],
  Task[],
  { rejectValue: string }
>('training/sendAnswers', async (answers, { rejectWithValue }) => {
  try {
    const { data } = await api.post<AnswerResult[]>('/words/answers', answers);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});