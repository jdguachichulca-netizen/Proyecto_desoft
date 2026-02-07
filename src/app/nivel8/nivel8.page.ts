import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { lockOpen, arrowUpCircle } from 'ionicons/icons';

@Component({
  selector: 'app-nivel8',
  templateUrl: './nivel8.page.html',
  styleUrls: ['./nivel8.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon]
})
export class Nivel8Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  codigoUsuario: string = 'Algoritmo Matrix\n\t// Define la Dimension de 3x3\n\t\n\t// Activa los nodos para formar una X\n\t// Pista: red[2,2] <- 1\n\nFinAlgoritmo';

  nivelCompletado: boolean = false;
  puntosTotales: number = 0;
  mostrarOverlay: boolean = false;

  matrizVisual: number[][] = [
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
  ];

  consolaLogs: any[] = [{mensaje: 'Esperando configuración de red...', tipo: 'info'}];

  constructor() {
    addIcons({ lockOpen, arrowUpCircle });
  }

  ejecutarCodigo() {
    // Limpieza
    const codigo = this.codigoUsuario.toLowerCase().replace(/\s+/g, '');
    this.consolaLogs = [];
    
    this.matrizVisual = [[0,0,0],[0,0,0],[0,0,0]];

    if (!codigo.includes('dimensionred[3,3]')) {
      this.consolaLogs.push({mensaje: 'Error: Falta crear la matriz. Escribe: Dimension red[3,3]', tipo: 'error'});
      return;
    }
    
    this.consolaLogs.push({mensaje: '> Matriz 3x3 inicializada.', tipo: 'info'});

    let nodosActivos = 0;

    const verificarPunto = (f: number, c: number) => {
      const patron1 = `red[${f},${c}]<-1`;
      const patron2 = `red[${f},${c}]=1`;
      
      if (codigo.includes(patron1) || codigo.includes(patron2)) {
        this.matrizVisual[f-1][c-1] = 1;
        this.consolaLogs.push({mensaje: `> Nodo [${f},${c}] ACTIVADO.`, tipo: 'success'});
        nodosActivos++;
        return true;
      }
      return false;
    };

    verificarPunto(2,2); // Centro
    verificarPunto(1,1); // Esq sup izq
    verificarPunto(1,3); // Esq sup der
    verificarPunto(3,1); // Esq inf izq
    verificarPunto(3,3); // Esq inf der

    if (nodosActivos === 5) {
      this.consolaLogs.push({mensaje: '¡SINCRONIZACIÓN COMPLETA!', tipo: 'success'});
      this.consolaLogs.push({mensaje: 'Núcleo estabilizado.', tipo: 'success'});
      
      this.nivelCompletado = true;
      this.puntosTotales = 1000;
      
      // Opcional: Esto lo puedes quitar si ya no usas el bloqueo manual por localStorage
      // localStorage.setItem('nivel_desbloqueado', 'intermedio');

    } else {
      this.consolaLogs.push({mensaje: `Advertencia: Patrón incompleto. (${nodosActivos}/5 nodos)`, tipo: 'error'});
      this.consolaLogs.push({mensaje: 'Debes formar una X activando esquinas y centro.', tipo: 'info'});
    }
  }

  mostrarVictoriaManual() {
    this.mostrarOverlay = true;
  }

  //  AQUÍ ESTÁ EL CAMBIO PARA GUARDAR PROGRESO
  irAlMenuMisiones() {
    // ANTES: this.auth.ganarXP(300);

    // AHORA: Guardamos nivel, subimos LÓGICA (Matrices avanzadas) y damos 300 XP
    this.auth.completarNivel('nivel8', 'logica', 300);
    
    // Regresamos al menú de misiones para ver el progreso desbloqueado
    this.router.navigate(['/misiones']);
  }
}