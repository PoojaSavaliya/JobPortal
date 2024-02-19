import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addJob, updateJob } from 'src/app/state/job.actions';
import { selectJobById } from 'src/app/state/job.selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  jobForm!: FormGroup;
  jobNames: string[] = ['FrontEnd', 'Back End', 'Full Stack'];
  job: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params['id']);
      this.store.pipe(select(selectJobById(params['id']))).subscribe((job) => {
        console.log(job);
        this.job = job;
      });
    });
    this.jobForm = new FormGroup({
      jobName: new FormControl(this.job ? this.job.jobName : '', [
        Validators.required,
      ]),
      jobDescription: new FormControl(this.job ? this.job.jobDescription : '', [
        Validators.required,
      ]),
      companyName: new FormControl(this.job ? this.job.companyName : '', [
        Validators.required,
      ]),
      location: new FormControl(this.job ? this.job.location : '', [
        Validators.required,
      ]),
      salary: new FormControl(this.job ? this.job.salary : '', [
        Validators.required,
      ]),
      requirements: new FormControl(this.job ? this.job.requirements : '', [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;
      if (this.job) {
        this.store.dispatch(updateJob({ id: this.job.id, job: formData }));
        this.router.navigate(['']);
      } else {
        this.store.dispatch(addJob({ job: formData }));
        this.router.navigate(['']);
      }
    }
  }
}
