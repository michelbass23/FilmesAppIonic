import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../user';
import  {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  currentUser: any;
    constructor(private afAuth:AngularFireAuth,
        private httpClient:HttpClient
      ) { } 

    registerWithEmail(email:string,password:string){
        return this.afAuth.createUserWithEmailAndPassword(email,password);
    }
    loginWithEmail(email:string,password:string){
      return this.afAuth.signInWithEmailAndPassword(email,password);
    }
    recoverPassword(email:string){
      return this.afAuth.sendPasswordResetEmail(email);
    }
    logout(){
      return this.afAuth.signOut();
    }
    showUser(){
       
    }
  
  
  }
  

        
