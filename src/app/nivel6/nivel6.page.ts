import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';

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
  sectorActual: number = 0; 
  consolaLogs: any[] = [{mensaje: 'Esperando activación de barrido...', tipo: 'info'}];

  constructor() { }

  async ejecutarCodigo() {
    const codigo = this.codigoUsuario.toLowerCase().replace(/\s+/g, ' ');
    this.consolaLogs = [];
    this.sectorActual = 0;

    // VALIDACIÓN:
    const tienePara = codigo.includes('para ');
    const tieneHasta = codigo.includes('hasta 5') || codigo.includes('hasta5');
    const tieneHacer = codigo.includes('hacer');
    const tieneSumaManual = codigo.includes('+1') || codigo.includes('+ 1');

    // 1. VALIDACIÓN ESTRICTA DE "ESCRIBIR"
    if (!codigo.includes('escribir')) {
        this.consolaLogs.push({ 
            mensaje: '❌ ERROR DE SINTAXIS: Comando no reconocido. ¿Quisiste decir "Escribir"?', 
            tipo: 'error' 
        });
        return; 
    }

    // 2. VALIDACIÓN DE CIERRE "FINPARA"
    if (!codigo.includes('finpara') && !codigo.includes('fin para')) {
        this.consolaLogs.push({ 
            mensaje: '❌ ERROR: El ciclo está abierto. Debes cerrarlo con "FinPara".', 
            tipo: 'error' 
        });
        return; 
    }

    if (tienePara && tieneHasta && tieneHacer) {
      
      if (tieneSumaManual) {
        this.consolaLogs.push({mensaje: 'ADVERTENCIA: En el ciclo PARA no necesitas sumar +1 manualmente. ¡Lo hace solo!', tipo: 'error'});
        return; 
      }

      // 👇👇👇 AQUÍ ESTÁ EL CAMBIO 👇👇👇
      // Capturamos lo que escribiste entre comillas (Ej: "escaneando")
      const matchTexto = codigo.match(/escribir\s*["']([^"']+)["']/);
      // Si encontraste texto, úsalo. Si no, usa uno por defecto.
      const mensajeUsuario = matchTexto ? matchTexto[1] : 'Escaneando...';
      // 👆👆👆 FIN DEL CAMBIO 👆👆👆


      // ¡CÓDIGO CORRECTO!
      this.ejecutando = true;
      this.consolaLogs.push({mensaje: '> Iniciando secuencia automática...', tipo: 'info'});
      
      // Simulación del barrido
      for (let i = 1; i <= 5; i++) {
        await new Promise(r => setTimeout(r, 600)); 
        
        this.sectorActual = i;
        
        // 👇 AQUÍ MOSTRAMOS TU MENSAJE EN LA CONSOLA
        this.consolaLogs.push({mensaje: `> Sector ${i}: "${mensajeUsuario}"`, tipo: 'info'});
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
    this.router.navigate(['/nivel7']); 
  }
}