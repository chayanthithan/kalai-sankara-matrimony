import { Injectable } from '@angular/core';
import { getDocs, query, where,Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { AdminDto } from '../model/AdminDto';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  addUser(user: any) {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, user);
  }
 
  

  getUsers(): Observable<any[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' });
  }

  updateUser(id: string, data: any) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return updateDoc(userDocRef, data);
  }

  deleteUser(id: string) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return deleteDoc(userDocRef);
  }

  
// new methods are below

  validateAdminLogin(username: string, password: string): Promise<boolean> {
    const userRef = collection(this.firestore, 'loginDetails');
    const q = query(userRef, where('username', '==', username), where('password', '==', password), where('role', '==', 'ADMIN'));
    
    return getDocs(q).then(snapshot => {
      return !snapshot.empty; // true if user found
    });
  }

  addMatrimonyDetailsPost(matrimony: any) {
    const userRef = collection(this.firestore, 'groomAndBrideDetails');
    return addDoc(userRef, matrimony);
  }
  getReviewDetails(): Observable<any[]> {
      const userRef = collection(this.firestore, 'reviews');
      return collectionData(userRef, { idField: 'id' });
    }
  getContactDetails(): Observable<any[]> {
      const userRef = collection(this.firestore, 'contact details');
      return collectionData(userRef, { idField: 'id' });
    }

  getMatrimonyDetails(filter?: string): Observable<any[]> {
  const userRef = collection(this.firestore, 'groomAndBrideDetails');
  return collectionData(userRef, { idField: 'id' }).pipe(
    map(data => {
      if (!filter || filter === 'all') {
        return data;
      }
      return data.filter(item => item['category'] === filter);
    })
  );
}

  addReviews(review: any) {
    const userRef = collection(this.firestore, 'reviews');
    return addDoc(userRef, review);
  }

}
