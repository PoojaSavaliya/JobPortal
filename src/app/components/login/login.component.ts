import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  password: any;
  email: any;

  constructor(private auth: AngularFireAuth) {}

  onSubmit() {
    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
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
