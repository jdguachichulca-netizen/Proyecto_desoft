import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons'; 
import { cardOutline } from 'ionicons/icons'; 

@Component({
  selector: 'app-nivel12',
  templateUrl: './nivel12.page.html',
  styleUrls: ['./nivel12.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class Nivel12Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  codigoUsuario: string = '';
  nivelCompletado: boolean = false;
  consolaLogs: { mensaje: string, tipo: string }[] = [];
  mensajeSistema: string = '';

  constructor() {
    addIcons({ cardOutline });
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    this.mensajeSistema = '';
    const codigo = this.codigoUsuario;

    this.consolaLogs.push({ mensaje: 'Generando credencial...', tipo: 'info' });

    // --- VALIDACIONES ESTRICTAS ---

    // 1. Validar uso de BACKTICKS (Es el objetivo del nivel)
    if (!codigo.includes('`')) {
      this.logError('Debes usar comillas invertidas (`...`) para crear la plantilla.');
      return;
    }

    // 2. Validar interpolación ${} (Es el objetivo del nivel)
    if (!codigo.includes('${')) {
      this.logError('No estás inyectando datos. Usa la sintaxis ${variable} dentro del texto.');
      return;
    }

    // 3. Validar variables solicitadas
    if (!codigo.includes('let agente') || !codigo.includes('let rango')) {
      this.logError('Debes definir las variables "agente" y "rango".');
      return;
    }

    // 4. Validar console.log CON PARÉNTESIS (Corrección solicitada)
    // Usamos una expresión regular para buscar "console.log" seguido opcionalmente de espacio y luego "("
    if (!/console\.log\s*\(/.test(codigo)) {
      this.logError('¡Sintaxis incorrecta! console.log es una función y necesita paréntesis: console.log(...)');
      return;
    }

    if (!codigo.includes(')')) {
      this.logError('Olvidaste cerrar el paréntesis final de console.log(...)');
      return;
    }

    // --- ÉXITO ---
    setTimeout(() => {
      // Simulamos la salida correcta basada en la petición
      const resultado = 'ID: W-BIT | Rango: 5';
      
      this.consolaLogs.push({ mensaje: `> Credencial creada:`, tipo: 'success' });
      this.consolaLogs.push({ mensaje: `> "${resultado}"`, tipo: 'info' });
      this.consolaLogs.push({ mensaje: '> ACCESO AUTORIZADO', tipo: 'success' });
      
      this.mensajeSistema = resultado;
      this.nivelCompletado = true;
    }, 800);
  }

  logError(msg: string) {
    setTimeout(() => {
        this.consolaLogs.push({ mensaje: ` ERROR: ${msg}`, tipo: 'error' });
    }, 400);
  }

  guardarProgreso() {
    this.auth.completarNivel('nivel12', 'sintaxis', 350);
    setTimeout(() => {
      this.router.navigate(['/nivel13']);
    }, 500);
  }
}