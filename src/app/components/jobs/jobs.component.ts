import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deleteJob, loadJobs, updateJob } from 'src/app/state/job.actions';
import { Job } from 'src/app/state/job.model';
import { selectJobNames, selectJobs } from 'src/app/state/job.selectors';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  allJobs$!: Observable<Job[]>;
  filteredJobs$!: Observable<Job[]>;
  selectedFilter: string = 'All';
  jobNames$!: any;
  user$!: Observable<any>;
  constructor(
    private store: Store,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadJobs());
    this.allJobs$ = this.store.pipe(select(selectJobs));
    this.jobNames$ = this.store.pipe(select(selectJobNames));
    this.filteredJobs$ = this.allJobs$;
    this.user$ = this.auth.authState;
  }

  applyFilter(filter: any) {
    console.log(filter);
    this.selectedFilter = filter.tab.textLabel;
    if (filter.tab.textLabel === 'All') {
      this.filteredJobs$ = this.allJobs$;
    } else {
      this.filteredJobs$ = this.allJobs$.pipe(
        map((jobs) =>
          jobs.filter((job) => job.jobName === filter.tab.textLabel)
        )
      );
    }
  }

  delete(id: any) {
    this.store.dispatch(deleteJob({ id }));
  }

  update(id: any) {
    this.router.navigate(['/add-job'], {
      queryParams: {
        id: id,
      },
    });
  }
}
