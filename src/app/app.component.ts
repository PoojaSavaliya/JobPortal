import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  authLoaded = false;
  user$!: Observable<any>;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.auth.authState;
    this.user$.subscribe(() => {
      this.authLoaded = true;
    });
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        console.log('User logged out successfully');
        this.router.navigate(['jobs']);
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
