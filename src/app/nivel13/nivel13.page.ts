import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { nuclearOutline } from 'ionicons/icons';

@Component({
  selector: 'app-nivel13',
  templateUrl: './nivel13.page.html',
  styleUrls: ['./nivel13.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Nivel13Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  // 1. Guardamos el texto base para compararlo después
  textoBase: string = `// Configura el sensor
let sensor = "seguro";

// Escribe tu bucle while aquí abajo:
// while (...) { ... }
`;

  // 2. Inicializamos el código con el texto base
  codigoUsuario: string = this.textoBase;

  consolaLogs: { mensaje: string, tipo: string }[] = [];
  mensajeSistema: string = '';
  nivelCompletado: boolean = false;

  constructor() {
    addIcons({ nuclearOutline });
  }

  // 3. Función para borrar el texto al hacer clic
  limpiarTerminal() {
    if (this.codigoUsuario === this.textoBase) {
      this.codigoUsuario = '';
    }
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    this.mensajeSistema = "ANALIZANDO...";

    // Limpiamos espacios extra y saltos de línea para validar
    const codigoLimpio = this.codigoUsuario.replace(/\s+/g, ' ').trim();
    
    // VALIDACIONES ESTRICTAS

    // A) Definición de variable
    if (!codigoLimpio.includes('let sensor = "seguro"') && !codigoLimpio.includes("let sensor = 'seguro'")) {
      this.logError(" Error: Debes definir la variable: let sensor = \"seguro\";");
      return;
    }

    // B) Palabra clave while
    if (!codigoLimpio.includes('while')) {
      this.logError(" Error: No encuentro la instrucción 'while'.");
      return;
    }

    // C) Condición exacta
    const condicionCorrecta = /while\s*\(\s*sensor\s*==\s*["']seguro["']\s*\)/.test(codigoLimpio);
    if (!condicionCorrecta) {
      this.logError(" Error: La condición debe ser exactamente: while (sensor == \"seguro\")");
      return;
    }

    // D) Contenido estricto (avanzar(); con punto y coma)
    if (!codigoLimpio.includes('avanzar();')) {
      this.logError(" Error: Dentro del bucle debes escribir 'avanzar();' con punto y coma.");
      return;
    }

    // E) Estructura completa (Llaves { } y orden)
    // Buscamos: while (...) { avanzar(); }
    const estructuraValida = /while\s*\(\s*sensor\s*==\s*["']seguro["']\s*\)\s*\{\s*avanzar\(\);\s*\}/.test(codigoLimpio);

    if (!estructuraValida) {
        this.logError(" Error de Sintaxis: Asegúrate de que 'avanzar();' esté dentro de las llaves { }.");
        return;
    }

    // Si pasa todas las validaciones estrictas:
    this.simularEjecucion();
  }

  simularEjecucion() {
    this.consolaLogs.push({ mensaje: "> Iniciando protocolo de avance...", tipo: 'info' });
    let pasos = 0;
    const totalPasos = 5; 

    const intervalo = setInterval(() => {
      pasos++;
      this.consolaLogs.push({ mensaje: `[CICLO ${pasos}] Sensor: "seguro" -> Avanzando 1 metro.`, tipo: 'info' });
      this.mensajeSistema = `DISTANCIA: ${pasos * 10}m`;

      if (pasos >= totalPasos) {
        clearInterval(intervalo);
        this.finalizarNivel();
      }
    }, 800); 
  }

  finalizarNivel() {
    this.consolaLogs.push({ mensaje: "¡ALERTA! Radiación detectada. Deteniendo...", tipo: 'warning' });
    this.consolaLogs.push({ mensaje: " Bucle terminado correctamente.", tipo: 'success' });
    this.mensajeSistema = "SALIDA ALCANZADA";
    this.nivelCompletado = true;
  }

  logError(msg: string) {
    this.consolaLogs.push({ mensaje: msg, tipo: 'error' });
    this.mensajeSistema = "ERROR SINTAXIS";
  }

  guardarProgreso() {
    console.log("Guardando Nivel 13...");
    this.auth.completarNivel('nivel13', 'logica', 400); 
    this.router.navigate(['/nivel14']); 
  }
}