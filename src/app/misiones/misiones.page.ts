import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-misiones',
  templateUrl: './misiones.page.html',
  styleUrls: ['./misiones.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon, RouterLink]
})
export class MisionesPage {
  
  private router = inject(Router);
  public auth = inject(AuthService); 

  programadorHabilDesbloqueado: boolean = false;

  constructor() { }

  // Se ejecuta cada vez que entras a la pantalla (para refrescar datos)
  ionViewWillEnter() {
    const nivelActual = this.auth.currentLevel();
    console.log("Entrando a Misiones. Nivel actual:", nivelActual);

    // LÓGICA DE DESBLOQUEO:
    // Si el usuario ya va por el nivel 9 o superior, desbloqueamos la siguiente tarjeta
    if (nivelActual >= 9) {
      this.programadorHabilDesbloqueado = true;
    } else {
      this.programadorHabilDesbloqueado = false;
    }
  }

  // 👇 ESTA ES LA FUNCIÓN PRINCIPAL DEL BOTÓN AZUL
  jugarNivelActual() {
    const nivel = this.auth.currentLevel();

    // Si es el primer nivel, quizás quieras enviarlo a la Intro
    if (nivel === 1) {
      this.router.navigate(['/intro-pseint']); // O '/nivel1' si no tienes intro
    } 
    // Si ya avanzó, lo enviamos directo al nivel que le toca
    else {
      this.router.navigate(['/nivel' + nivel]);
    }
  }

  // Para la segunda tarjeta (Rango Hábil)
  irANivelJavascript() {
    if (this.programadorHabilDesbloqueado) {
        this.router.navigate(['/intro-js']); 
    }
  }
}