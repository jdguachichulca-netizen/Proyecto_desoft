import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router'; 
// Si AuthService no se usa, puedes borrar el import, pero lo dejo por si acaso
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
  programadorHabilDesbloqueado: boolean = false;

  constructor() { }

  // ESTA FUNCIÓN SE EJECUTA CADA VEZ QUE ENTRAS A LA PANTALLA
  ionViewWillEnter() {
    const nivelGuardado = localStorage.getItem('nivel_desbloqueado');
    console.log("Progreso detectado:", nivelGuardado); // 👇 MIRA ESTO EN CONSOLA

    if (nivelGuardado === 'intermedio' || nivelGuardado === 'avanzado') {
      this.programadorHabilDesbloqueado = true;
    } else {
        // Aseguramos que esté bloqueado si no cumple
        this.programadorHabilDesbloqueado = false;
    }
  }

  irACadete() {
    this.router.navigate(['/intro-pseint']);
  }

  irANivelJavascript() {
    // Solo navega si está desbloqueado
    if (this.programadorHabilDesbloqueado) {
        this.router.navigate(['/intro-js']); 
    }
  }
}