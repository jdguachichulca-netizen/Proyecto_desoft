import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// 👇 IMPORTANTE: Importamos IonContent para que funcione el HTML
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nivel11',
  templateUrl: './nivel11.page.html',
  styleUrls: ['./nivel11.page.scss'],
  standalone: true,
  // 👇 Agregamos IonContent aquí para que desaparezca el error rojo
  imports: [CommonModule, FormsModule, IonContent]
})
export class Nivel11Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  // Variables
  codigoUsuario: string = '';
  nivelCompletado: boolean = false;
  consolaLogs: { mensaje: string, tipo: string }[] = [];
  mensajeSistema: string = '';

  constructor() {}

  ejecutarCodigo() {
    this.consolaLogs = [];
    const codigo = this.codigoUsuario;

    // --- VALIDACIONES ---

    // 1. Validar que NO usen comillas en los números
    const usaComillasEnNumeros = /["']\d+["']/.test(codigo);

    if (usaComillasEnNumeros) {
      this.logError('¡ERROR DE SINTAXIS! Los números NO llevan comillas (ej: 2000, no "2000").');
      return;
    }

    // 2. Validar que exista la resta (-)
    if (!codigo.includes('-')) {
      this.logError('No se detectó ninguna resta. Debes restar el consumo de los escudos.');
      return;
    }

    // 3. Validar que definan las variables correctas
    if (!codigo.includes('let reactor') || !codigo.includes('let escudos')) {
      this.logError('Debes definir las variables "reactor" y "escudos".');
      return;
    }

    // 4. Validar console.log
    if (!codigo.includes('console.log')) {
      this.logError('Falta mostrar el resultado final con console.log().');
      return;
    }

    // --- ÉXITO ---
    this.consolaLogs.push({ mensaje: '> Analizando núcleo...', tipo: 'info' });
    
    setTimeout(() => {
      this.consolaLogs.push({ mensaje: '> Energía Base: 2000', tipo: 'info' });
      this.consolaLogs.push({ mensaje: '> Consumo Escudos: -500', tipo: 'info' });
      this.consolaLogs.push({ mensaje: '> RESULTADO: 1500 (ESTABLE)', tipo: 'success' });
      
      this.mensajeSistema = '1500 GW';
      this.nivelCompletado = true;
    }, 1000);
  }

  logError(msg: string) {
    this.consolaLogs.push({ mensaje: ` ${msg}`, tipo: 'error' });
  }

  guardarProgreso() {
    this.auth.completarNivel('nivel11', 'logica', 300);
    
    setTimeout(() => {
      this.router.navigate(['/nivel12']);
    }, 500);
  }
}