import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as JobActions from './job.actions';
import { FirebaseService } from '../services/FirebaseService/firebase.service';

@Injectable()
export class JobEffects {
  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.loadJobs),
      switchMap(() =>
        this.firebaseService.getAllData().pipe(
          map((jobs) => {
            const jobData =
              jobs && jobs.JobData
                ? Object.keys(jobs.JobData).map((key) => ({
                    id: key,
                    ...jobs.JobData[key],
                  }))
                : [];

            return JobActions.jobsLoaded({ JobData: jobData });
          })
        )
      )
    )
  );

  addJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.addJob),
      switchMap((action) =>
        this.firebaseService.addData(action.job).pipe(
          map(() => {
            return JobActions.loadJobs();
          })
        )
      )
    )
  );

  updateJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.updateJob),
      switchMap((action) =>
        this.firebaseService.updateData(action.id, action.job).pipe(
          map(() => {
            return JobActions.loadJobs();
          })
        )
      )
    )
  );

  deleteJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.deleteJob),
      switchMap((action) =>
        this.firebaseService.deleteData(action.id).pipe(
          map(() => {
            return JobActions.loadJobs();
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService
  ) {}
}
