import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FirestoreService } from './services/firestore/firestore.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public dungeon;
  public monster;

  constructor(
    private firestore: FirestoreService,
    @Inject(DOCUMENT) private document: Document
  ){}

  ngOnInit() {
    const url = this.document.location.hostname.split('.');
    if (url.length == 3) {
      this.firestore.getDungeon(url[0]).pipe(
        switchMap((dungeon) => {
          this.dungeon = dungeon[0].payload.doc.data();
          return dungeon;
        }),
        switchMap((dungeon) => {
          return this.firestore.getMonster(this.dungeon.monster_id);
        })
      ).subscribe((monster: any) => {
        this.monster = monster.payload.data();
      }, (error) => {
        console.error(error);
      });
    } else {
      console.error('Error en el parseo de la URL');
    }
  }
}
