import { getModuleFactory, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import {
  AngularFirestore,
} from '@angular/fire/firestore';
import { AdminsService } from '../adminsservices/admins.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private addadmin: AdminsService,
  ) {}

  // Sign up with email/password
  SignUp(email, password, data) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.addadmin.createAdmin({ ...data, uid: result.user.uid });

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign in with email/password
  SignIn(email, password) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afs
          .collection('Admins')
          .get()
          .subscribe((docs) => {
            docs.forEach((doc) => {
              if (doc.data().uid === firebase.auth().currentUser.uid) {
                console.log(doc.data());
                console.log(doc.id);
                localStorage.setItem('user', JSON.stringify(doc.data()));
                localStorage.setItem('doc',JSON.stringify(doc.id));
                window.location.reload();
              }
            });
          });
        this.router.navigate(['/myprofile']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
        this.router.navigate(['/restform']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }



  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signin']);
    });
  }


}
