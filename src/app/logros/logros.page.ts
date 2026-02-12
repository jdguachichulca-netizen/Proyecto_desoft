import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, ViewWillEnter } from '@ionic/angular/standalone'; // 👈 Importamos ViewWillEnter
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { 
  flash, cube, infinite, fileTrayFull, gitNetwork, lockClosed, ribbon 
} from 'ionicons/icons';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.page.html',
  styleUrls: ['./logros.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
// 👇 Añadimos "implements ViewWillEnter" para ser ordenados
export class LogrosPage implements OnInit, ViewWillEnter {
  
  auth = inject(AuthService);
  nivelUsuario: number = 1;

  insignias = [
    {
      id: 1,
      titulo: 'LA CHISPA INICIAL',
      desc: 'Escribiste tu primera línea de código.',
      nivelRequerido: 2, 
      icono: 'flash',
      color: '#ffeb3b' 
    },
    {
      id: 2,
      titulo: 'GUARDIÁN DE DATOS',
      desc: 'Dominaste el arte de guardar información.',
      nivelRequerido: 4,
      icono: 'file-tray-full',
      color: '#4ade80' 
    },
    {
      id: 3,
      titulo: 'SEÑOR DE LOS CICLOS',
      desc: 'Aprendiste a automatizar tareas repetitivas.',
      nivelRequerido: 6,
      icono: 'infinite',
      color: '#f472b6' 
    },
    {
      id: 4,
      titulo: 'ARQUITECTO LÓGICO',
      desc: 'Tomas decisiones complejas con condicionales.',
      nivelRequerido: 8,
      icono: 'git-network',
      color: '#00fff5' 
    },
    {
      id: 5,
      titulo: 'PROYECCIONISTA',
      desc: 'Dominas los hologramas de texto (Template Literals).',
      nivelRequerido: 12,
      icono: 'cube',
      color: '#a78bfa' 
    }
  ];

  constructor() {
    addIcons({ flash, cube, infinite, fileTrayFull, gitNetwork, lockClosed, ribbon });
  }

  ngOnInit() {
    // Esto se ejecuta solo la primera vez, lo dejamos por si acaso
    this.actualizarDatos();
  }

  // 👇 ESTE ES EL TRUCO: Se ejecuta CADA VEZ que entras a la página
  ionViewWillEnter() {
    this.actualizarDatos();
  }

  actualizarDatos() {
    // Forzamos a leer el nivel actual del servicio
    this.nivelUsuario = this.auth.currentLevel();
    console.log('Entrando a Logros. Nivel detectado:', this.nivelUsuario);
  }

  esDesbloqueado(nivelReq: number): boolean {
    return this.nivelUsuario >= nivelReq;
  }

  contarDesbloqueadas() {
    return this.insignias.filter(i => this.esDesbloqueado(i.nivelRequerido)).length;
  }
}