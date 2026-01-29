import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
// 1. IMPORTAMOS RouterLink AQUÍ 👇
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-misiones',
  templateUrl: './misiones.page.html',
  styleUrls: ['./misiones.page.scss'],
  standalone: true,
  // 2. AGREGAMOS RouterLink A LA LISTA DE IMPORTS 👇
  imports: [IonContent, CommonModule, FormsModule, IonIcon, RouterLink]
})
export class MisionesPage {
  
  private router = inject(Router);
  
  programadorHabilDesbloqueado: boolean = false;

  constructor() { }

  ionViewWillEnter() {
    const nivelGuardado = localStorage.getItem('nivel_desbloqueado');
    if (nivelGuardado === 'intermedio' || nivelGuardado === 'avanzado') {
      this.programadorHabilDesbloqueado = true;
    }
  }

  // Ya no necesitas la función irACadete() porque lo estás haciendo directo en el HTML con routerLink
  
  irANivelJavascript() {
    console.log("Navegando a JS...");
    this.router.navigate(['/nivel9']); 
  }
}