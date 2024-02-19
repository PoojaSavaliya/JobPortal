import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      take(1),
      map((user) => {
        if (user) {
          console.log('islogin');

          return true;
        } else {
          console.log('is not login');
          this.router.navigate(['/jobs']);
          return false;
        }
      })
    );
  }
}
