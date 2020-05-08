import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthProvider {
  user;

  constructor(private auth: AngularFireAuth) {}

  login = (data) => this.auth.signInWithEmailAndPassword(data.email, data.senha);

  logout = () =>  this.auth.signOut();

  authState = () => this.auth.authState.pipe(first()).toPromise();

}
