import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
// Puedes agregar iconos si quieres, pero por ahora no usamos ion-icon nuevos

@Component({
  selector: 'app-nivel6',
  templateUrl: './nivel6.page.html',
  styleUrls: ['./nivel6.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, CommonModule, FormsModule, IonIcon]
})
export class Nivel6Page {
  
  private auth = inject(AuthService);
  private router = inject(Router);

  // Código inicial
  codigoUsuario: string = 'Algoritmo Radar\n\t\n\t// Escribe tu ciclo Para aquí\n\t\nFinAlgoritmo';

  nivelCompletado: boolean = false;
  ejecutando: boolean = false;
  sectorActual: number = 0; // Controla qué punto del radar brilla (0 a 5)
  consolaLogs: any[] = [{mensaje: 'Esperando activación de barrido...', tipo: 'info'}];

  constructor() { }

  async ejecutarCodigo() {
    const codigo = this.codigoUsuario.toLowerCase().replace(/\s+/g, ' ');
    this.consolaLogs = [];
    this.sectorActual = 0;

    // VALIDACIÓN:
    // 1. Debe tener "para"
    // 2. Debe tener "hasta 5"
    // 3. Debe tener "hacer"
    // 4. NO debe tener "variable <- variable + 1" (error común de novatos en Para)
    
    const tienePara = codigo.includes('para ');
    const tieneHasta = codigo.includes('hasta 5') || codigo.includes('hasta5');
    const tieneHacer = codigo.includes('hacer');
    const tieneSumaManual = codigo.includes('+1') || codigo.includes('+ 1');

    if (tienePara && tieneHasta && tieneHacer) {
      
      if (tieneSumaManual) {
        this.consolaLogs.push({mensaje: 'ADVERTENCIA: En el ciclo PARA no necesitas sumar +1 manualmente. ¡Lo hace solo!', tipo: 'error'});
        return; // Detenemos para que corrija
      }

      // ¡CÓDIGO CORRECTO!
      this.ejecutando = true;
      this.consolaLogs.push({mensaje: '> Iniciando secuencia automática...', tipo: 'info'});
      
      // Simulación del barrido
      for (let i = 1; i <= 5; i++) {
        await new Promise(r => setTimeout(r, 600)); // Espera entre sectores
        
        this.sectorActual = i;
        this.consolaLogs.push({mensaje: `> Sector ${i} [OK] - Detectando...`, tipo: 'info'});
      }

      await new Promise(r => setTimeout(r, 500));
      this.consolaLogs.push({mensaje: '¡BARRIDO COMPLETO! VÍA LIBRE.', tipo: 'success'});
      this.consolaLogs.push({mensaje: '¡MISIÓN CUMPLIDA! +150 XP', tipo: 'success'});
      
      this.nivelCompletado = true;
      this.ejecutando = false;

    } else {
      this.consolaLogs.push({mensaje: 'Error de Sintaxis:', tipo: 'error'});
      if (!tienePara) this.consolaLogs.push({mensaje: '- Falta el comando "Para"', tipo: 'error'});
      if (!tieneHasta) this.consolaLogs.push({mensaje: '- El rango debe ser "Hasta 5"', tipo: 'error'});
    }
  }

  finalizarMision() {
    this.auth.ganarXP(150);
    this.router.navigate(['/nivel7']); // O al siguiente nivel si lo creas
  }
}