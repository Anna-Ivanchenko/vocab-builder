import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTasks, sendAnswers } from './operations';
import { logout } from '../auth/operations';
import type { AnswerResult, Task } from '../../types/training';

interface TrainingState {
  tasks: Task[];
  results: AnswerResult[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TrainingState = {
  tasks: [],
  results: [],
  isLoading: false,
  error: null,
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    resetTraining: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.results = [];
        state.isLoading = false;
      })
      .addCase(sendAnswers.fulfilled, (state, { payload }) => {
        state.results = payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState)
      .addMatcher(isAnyOf(fetchTasks.pending, sendAnswers.pending), state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(fetchTasks.rejected, sendAnswers.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload ?? 'Something went wrong';
        },
      );
  },
});

export const { resetTraining } = trainingSlice.actions;
export const trainingReducer = trainingSlice.reducer;