import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private angularFirestore:AngularFirestore) {


   }
   getJobs(){
    return this.angularFirestore.collection('job').snapshotChanges();
   }
}
