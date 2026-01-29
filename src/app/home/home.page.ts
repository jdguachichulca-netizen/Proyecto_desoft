import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonContent, 
  IonButton, 
  IonGrid, 
  IonRow, 
  IonCol 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader, 
    IonToolbar, 
    IonContent, 
    IonButton, 
    IonGrid, 
    IonRow, 
    IonCol
  ],
})
export class HomePage {
  constructor() {}
}