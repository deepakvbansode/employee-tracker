import { Subject } from 'rxjs/Subject';
import { IUser } from './../models/app.models';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';


@Injectable()
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  private users: IUser[];

  private _onDestroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private afs: AngularFirestore) {
    this.initUsers();
   }

  initUsers(){
    this.usersCollection = this.afs.collection('users');
    this.usersCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data } as IUser;
      });
    }).takeUntil(this._onDestroy$)
      .subscribe((data:IUser[]) => this.users = data);
  }

  login(email:string, password:string) {
    let validUser = this.users.find((user:IUser)=>{
      return user.user_name == email && user.password == password;
    });
    if(validUser){
      localStorage.setItem('tracker-employee', JSON.stringify(validUser));
      return validUser;
    }

    return false; //correct serve
    //return false; //time being fake
  }

  logout(){
    localStorage.removeItem('tracker-employee');
  }

  getLoggedInUser(){
    return JSON.parse(localStorage.getItem('tracker-employee'));
  }
  ngOnDestroy() {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }
}
