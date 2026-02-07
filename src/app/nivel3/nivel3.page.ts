import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

//  1. IMPORTAMOS LAS HERRAMIENTAS DE ICONOS
import { addIcons } from 'ionicons';
import { lockClosed } from 'ionicons/icons';

@Component({
  selector: 'app-nivel3',
  templateUrl: './nivel3.page.html',
  styleUrls: ['./nivel3.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon]
})
export class Nivel3Page {

  private router = inject(Router);
  public auth = inject(AuthService); 

  codigoUsuario: string = 'Algoritmo Identidad\n\t\nFinAlgoritmo';
  consolaLogs: any[] = []; 
  estado: string = 'inicial'; 
  nombreComandante: string = '';

  constructor() { 
    //  2. REGISTRAMOS EL CANDADO
    addIcons({ lockClosed });
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    this.estado = 'inicial'; 
    
    const codigo = this.codigoUsuario.toLowerCase().trim();

    // Validaciones
    if (!codigo.includes('leer')) {
      this.consolaLogs.push({ mensaje: ' ERROR: Falta el comando "Leer".', tipo: 'error' });
      return;
    }

    const validacionEstricta = /leer\s+nombre/i;
    if (!validacionEstricta.test(codigo)) {
      this.consolaLogs.push({ mensaje: ' ERROR: Comando incompleto. Ej: "Leer nombre"', tipo: 'error' });
      return;
    }

    // ÉXITO
    this.consolaLogs.push({ mensaje: '> Analizando sintaxis...', tipo: 'info' });

    setTimeout(() => {
      this.consolaLogs.push({ mensaje: ' Sintaxis Correcta.', tipo: 'success' });
      this.consolaLogs.push({ mensaje: '⏸ Esperando entrada de datos...', tipo: 'warning' });
      
      this.estado = 'esperando'; 
    }, 800);
  }

  confirmarNombre() {
    if (this.nombreComandante.trim() === '') return;

    this.estado = 'completado';

    this.consolaLogs.push({ mensaje: `> Dato recibido: "${this.nombreComandante}"`, tipo: 'success' });
    this.consolaLogs.push({ mensaje: ' IDENTIDAD CONFIRMADA', tipo: 'success' });
  }

  // AQUÍ ESTÁ EL CAMBIO PARA GUARDAR PROGRESO
  finalizarMision() {
    // ANTES: this.auth.ganarXP(150);

    // AHORA: Guardamos nivel, subimos habilidad DEPURACIÓN y damos XP
    // Parámetros: ('ID_NIVEL', 'TIPO_HABILIDAD', XP)
    this.auth.completarNivel('nivel3', 'depuracion', 150);
    
    // Con esto subirá la barra ROJA en tu inicio.
    
    this.router.navigate(['/nivel4']); 
  }
}