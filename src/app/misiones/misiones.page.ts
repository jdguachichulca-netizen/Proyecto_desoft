import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../auth.service'; // 👈 Asegúrate de importar esto

@Component({
  selector: 'app-misiones',
  templateUrl: './misiones.page.html',
  styleUrls: ['./misiones.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon, RouterLink]
})
export class MisionesPage {
  
  private router = inject(Router);
  public auth = inject(AuthService); // 👈 Inyectamos el servicio público para usarlo

  programadorHabilDesbloqueado: boolean = false;

  constructor() { }

  // Se ejecuta cada vez que entras a la pantalla
  ionViewWillEnter() {
    // 1. Obtenemos la lista de niveles que el usuario ha completado
    const niveles = this.auth.userStats().nivelesCompletados;
    
    console.log("Niveles completados:", niveles);

    // 2. Verificamos si 'nivel8' está en esa lista
    if (niveles.includes('nivel8')) {
      this.programadorHabilDesbloqueado = true;
    } else {
      this.programadorHabilDesbloqueado = false;
    }
  }

  irACadete() {
    this.router.navigate(['/intro-pseint']);
  }

  irANivelJavascript() {
    if (this.programadorHabilDesbloqueado) {
        // Asegúrate de que esta ruta '/intro-js' o '/nivel9' exista en tu app-routes
        this.router.navigate(['/intro-js']); 
    }
  }
}