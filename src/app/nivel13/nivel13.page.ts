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

  codigoUsuario: string = `// Configura el sensor
let sensor = "seguro";

// Escribe tu bucle while aquí abajo:

`;

  consolaLogs: { mensaje: string, tipo: string }[] = [];
  mensajeSistema: string = '';
  nivelCompletado: boolean = false;

  constructor() {
    addIcons({ nuclearOutline });
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    this.mensajeSistema = "ANALIZANDO...";

    // Limpieza básica del código
    const code = this.codigoUsuario.replace(/\s+/g, ' ').trim();
    const cleanCode = code.toLowerCase();

    // Validaciones paso a paso
    if (!cleanCode.includes('let sensor = "seguro"') && !cleanCode.includes("let sensor = 'seguro'")) {
      this.logError("Error: Debes definir la variable sensor.");
      return;
    }

    if (!cleanCode.includes('while')) {
      this.logError("Error: Falta la instrucción 'while'.");
      return;
    }

    if (!cleanCode.includes('sensor == "seguro"') && !cleanCode.includes("sensor == 'seguro'")) {
      this.logError("Error: La condición debe ser (sensor == 'seguro').");
      return;
    }

    if (!cleanCode.includes('avanzar()')) {
      this.logError("Error: Falta la acción avanzar() dentro del bucle.");
      return;
    }

    // SI TODO ESTÁ BIEN: Simulamos la ejecución
    this.simularEjecucion();
  }

  simularEjecucion() {
    let pasos = 0;
    const totalPasos = 4;

    const intervalo = setInterval(() => {
      pasos++;
      this.consolaLogs.push({ mensaje: `Paso ${pasos}: Sensor indica "seguro". Avanzando...`, tipo: 'info' });
      this.mensajeSistema = `AVANZANDO... (${pasos})`;

      if (pasos >= totalPasos) {
        clearInterval(intervalo);
        this.finalizarNivel();
      }
    }, 800);
  }

  finalizarNivel() {
    this.consolaLogs.push({ mensaje: "¡ALERTA! Fin del túnel detectado.", tipo: 'success' });
    this.consolaLogs.push({ mensaje: "Bucle finalizado correctamente.", tipo: 'success' });
    this.mensajeSistema = "SALIDA ENCONTRADA";
    this.nivelCompletado = true;
  }

  logError(msg: string) {
    this.consolaLogs.push({ mensaje: msg, tipo: 'error' });
    this.mensajeSistema = "ERROR DE SINTAXIS";
  }

  guardarProgreso() {
    console.log("Guardando Nivel 13...");
    this.auth.completarNivel('nivel13', 'logica', 400); // 400 XP por ser while
    this.router.navigate(['/misiones']);
  }
}