import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user$!: Observable<any>;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit() {
    this.user$ = this.auth.authState;
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        console.log('User logged out successfully');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }
}
