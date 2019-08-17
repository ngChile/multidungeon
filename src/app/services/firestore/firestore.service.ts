import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private afs: AngularFirestore,
  ) {}

  //Obtiene un dungeon basado en el subdominio
  public getDungeon(subdomain: string) {
    return this.afs.collection('dungeons', ref => ref.where('subdomain', '==', subdomain)).snapshotChanges()
  }

  //Obtiene el detalle de un monstruo
  public getMonster(id: string) {
    return this.afs.collection('monsters').doc(id).snapshotChanges()
  }
}
