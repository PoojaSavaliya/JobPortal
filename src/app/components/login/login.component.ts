import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  password: any;
  email: any;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  onSubmit() {
    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        this.router.navigate(['jobs']);
      })
      .catch((error) => {
        alert('incorrect username/password');
      });
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
