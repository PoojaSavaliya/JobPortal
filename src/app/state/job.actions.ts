import { createAction, props } from '@ngrx/store';
import { Job } from './job.model';

export const loadJobs = createAction('[Job] Load Jobs');
export const jobsLoaded = createAction(
  '[Job] Jobs Loaded',
  props<{ JobData: Job[] }>()
);
export const addJob = createAction('[Job] Add Job', props<{ job: Job }>());
export const updateJob = createAction(
  '[Job] Update Job',
  props<{ id: string; job: Job }>()
);
export const deleteJob = createAction(
  '[Job] Delete Job',
  props<{ id: string }>()
);
