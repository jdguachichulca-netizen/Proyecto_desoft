import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // 👈 Importamos el cerebro

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton]
})
export class LandingPage implements OnInit {

  private router = inject(Router);
  private auth = inject(AuthService);

  constructor() { }

  ngOnInit() {}

  // 👇 ESTO SOLUCIONA TU PROBLEMA
  ionViewWillEnter() {
    // Si el usuario ya existe, ¡no le mostramos la intro de nuevo!
    // Lo mandamos directo a su panel de misiones para que continúe.
    if (this.auth.isAuthenticated()) {
      console.log('Veterano detectado. Redirigiendo a la base...');
      this.router.navigate(['/misiones']); 
    }
  }

  empezarAventura() {
    // Esta función es solo para usuarios NUEVOS
    this.router.navigate(['/registro']);
  }
}