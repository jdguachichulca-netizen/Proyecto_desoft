import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone'; // Importante
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nivel11',
  templateUrl: './nivel11.page.html',
  styleUrls: ['./nivel11.page.scss'],
  standalone: true,
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
    this.mensajeSistema = '';
    const codigo = this.codigoUsuario;

    this.consolaLogs.push({ mensaje: 'Analizando núcleo...', tipo: 'info' });

    // --- VALIDACIONES ESTRICTAS ---

    // 1. ¿Tiene la variable reactor en 2000?
    if (!codigo.includes('let reactor = 2000')) {
      this.logError('El reactor debe iniciar en 2000 (let reactor = 2000;)');
      return;
    }

    // 2. ¿Calculó correctamente los escudos (500)?
    if (!codigo.includes('= 500') && !codigo.includes('= 500')) {
      this.logError('Cálculo incorrecto. Para bajar de 2000 a 1500, ¿cuánto valen los escudos?');
      return;
    }

    // 3. VALIDACIÓN DE ESPACIOS EN LA RESTA (ESTRICTO)
    if (!codigo.includes(' - ')) {
      this.logError('¡Sintaxis comprimida! En JS profesional usamos espacios: variable - variable');
      return;
    }

    // 4. VALIDACIÓN DE CONSOLE.LOG (ANTI-TRAMPAS)
    const matchLog = codigo.match(/console\.log\(([^)]+)\)/);
    
    if (!matchLog) {
      this.logError('Falta mostrar el resultado con console.log()');
      return;
    }

    const contenidoLog = matchLog[1].trim(); 

    // Verificamos que NO sea un número directo ni un texto entre comillas
    if (contenidoLog.includes('"') || contenidoLog.includes("'") || !isNaN(Number(contenidoLog))) {
      this.logError('No hagas trampa escribiendo el valor manual. Imprime la VARIABLE del resultado.');
      return;
    }

    // --- ÉXITO ---
    setTimeout(() => {
      this.mensajeSistema = "1500 GW (ESTABLE)";
      this.consolaLogs.push({ mensaje: 'Energía Base: 2000', tipo: 'info' });
      this.consolaLogs.push({ mensaje: 'Consumo Escudos: -500', tipo: 'info' });
      this.consolaLogs.push({ mensaje: 'RESULTADO: 1500 (ESTABLE)', tipo: 'success' });
      
      this.nivelCompletado = true;
    }, 600);
  }

  logError(msg: string) {
    // Usamos setTimeout para que el mensaje aparezca después de "Analizando..."
    setTimeout(() => {
        this.consolaLogs.push({ mensaje: ` ERROR: ${msg}`, tipo: 'error' });
    }, 400);
  }

  guardarProgreso() {
    this.auth.completarNivel('nivel11', 'logica', 300);
    this.router.navigate(['/nivel12']); // O al nivel 12
  }
}