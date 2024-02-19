import { createReducer, on } from '@ngrx/store';
import { Job } from './job.model';
import * as JobActions from './job.actions';

export interface JobState {
  JobData: Job[];
}

export const initialState: JobState = {
  JobData: [],
};

export const jobReducer = createReducer(
  initialState,
  on(JobActions.jobsLoaded, (state, { JobData }) => {
    return { ...state, JobData };
  })
);
