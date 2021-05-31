import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Talent } from '../models/talent.model';

@Injectable({
  providedIn: 'root',
})
export class TalentService {
  constructor(private angularFirestore: AngularFirestore) {}

  getTalentDoc(id) {
    return this.angularFirestore.collection('talent').doc(id).valueChanges();
  }

  getTalentList() {
    return this.angularFirestore.collection('talent').snapshotChanges();
  }

  createTalent(talent: Talent) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('talent')
        .add(talent)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  deleteTalent(talent) {
    return this.angularFirestore.collection('talent').doc(talent.id).delete();
  }

  updateTalent(talent: Talent, id) {
    return this.angularFirestore
      .collection('talent')
      .doc(id)
      .update({
        name: talent.firstName + ' ' + talent.lastName,
        location: talent.location,
        category: talent.jobCategory,
        //connects: talent.connects,
        //earning: talent.earning
      });
  }
}
