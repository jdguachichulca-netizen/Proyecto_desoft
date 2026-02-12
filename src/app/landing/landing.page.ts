import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // 👈 1. IMPORTAMOS RouterLink
import { IonContent, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  // 👇 2. LO AGREGAMOS AQUÍ (Sin esto, el botón no funciona)
  imports: [
    IonContent, 
    CommonModule, 
    FormsModule, 
    IonButton, 
    IonGrid, 
    IonRow, 
    IonCol, 
    RouterLink // <--- ¡ESTO ES LA CLAVE!
  ]
})
export class LandingPage implements OnInit {
  
  private router = inject(Router);
  private auth = inject(AuthService);

  constructor() { }

  ngOnInit() {}

  ionViewWillEnter() {
    // Si ya existe un usuario logueado, lo mandamos a misiones
    if (this.auth.isAuthenticated()) {
      console.log('Veterano detectado. Redirigiendo...');
      this.router.navigate(['/misiones']);
    }
  }
}