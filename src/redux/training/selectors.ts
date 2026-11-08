import type { RootState } from '../store';

export const selectTasks = (state: RootState) => state.training.tasks;
export const selectResults = (state: RootState) => state.training.results;
export const selectTrainingLoading = (state: RootState) =>
  state.training.isLoading;