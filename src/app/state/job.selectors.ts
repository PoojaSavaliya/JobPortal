import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobState } from './job.reducer';

export const selectJobState = createFeatureSelector<JobState>('JobData');

export const selectJobs = createSelector(selectJobState, (state: JobState) => {
  return state.JobData;
});

export const selectJobNames = createSelector(
  selectJobState,
  (state: JobState) => {
    const uniqueJobNames = new Set<string>();
    Object.values(state.JobData).forEach((job: any) => {
      uniqueJobNames.add(job.jobName);
    });
    return ['All', ...Array.from(uniqueJobNames)];
  }
);

export const selectJobById = (id: string) =>
  createSelector(selectJobState, (state: JobState) =>
    state.JobData.find((job) => job.id === id)
  );
