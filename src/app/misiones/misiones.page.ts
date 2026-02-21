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
  maestroCodigoDesbloqueado: boolean = false;

  constructor() { }

  ionViewWillEnter() {
    const nivelActual = this.auth.currentLevel();
    console.log("Entrando a Misiones. Nivel actual:", nivelActual);

    // 1. PRIMERO revisamos la tarjeta FINAL (Nivel 16+ o Variable especial)
    if (this.auth.esMisionFinalAbierta() || nivelActual >= 16) {
      this.maestroCodigoDesbloqueado = true;
    } else {
      this.maestroCodigoDesbloqueado = false;
    }

    // 2. LUEGO revisamos la tarjeta MEDIO (JS / Nivel 9+)
    // AQUÍ ESTÁ EL ARREGLO: Se desbloquea si eres Nivel 9+ O SI YA ERES MAESTRO
    if (nivelActual >= 9 || this.maestroCodigoDesbloqueado) {
      this.programadorHabilDesbloqueado = true;
    } else {
      this.programadorHabilDesbloqueado = false;
    }
  }

  jugarNivelActual() {
    const nivel = this.auth.currentLevel();
    if (nivel === 1) {
      this.router.navigate(['/intro-pseint']); 
    } else {
      this.router.navigate(['/nivel' + nivel]);
    }
  }

  irANivelJavascript() {
    if (this.programadorHabilDesbloqueado) {
        // Si el nivel es bajo (ej. 1) pero está desbloqueado por ser maestro,
        // lo mandamos al inicio de JS (Intro o Nivel 9)
        if (this.auth.currentLevel() < 9) {
             this.router.navigate(['/intro-js']);
        } else {
             this.jugarNivelActual();
        }
    }
  }

  irARetoFinal() {
    if (this.maestroCodigoDesbloqueado) {
       console.log(" Iniciando protocolo final...");
       alert("¡ACCESO AL NÚCLEO CONCEDIDO! (Ruta pendiente)");
       this.router.navigate(['/nivel16']);
    }
  }
}