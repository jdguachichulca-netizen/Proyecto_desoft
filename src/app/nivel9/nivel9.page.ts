import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nivel9',
  templateUrl: './nivel9.page.html',
  styleUrls: ['./nivel9.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class Nivel9Page {

  private router = inject(Router);
  private auth = inject(AuthService);

  // Texto inicial en el editor
  codigoUsuario: string = '// Declara tu variable aquí\n\n\n// Muestra el equipo\n';

  nivelCompletado: boolean = false;
  consolaLogs: any[] = [{mensaje: 'Esperando código...', tipo: 'log-info'}];

  constructor() { }

  ejecutarCodigo() {
    this.consolaLogs = [];
    // Normalizamos el código (quitamos espacios extra y pasamos a minúsculas para validar fácil)
    const codigo = this.codigoUsuario.trim();
    const codigoLower = codigo.toLowerCase();

    // 1. VALIDAMOS QUE USE 'let'
    if (!codigoLower.includes('let ')) {
      this.consolaLogs.push({mensaje: 'Error: Debes usar "let" para declarar la variable.', tipo: 'log-error'});
      return;
    }

    // 2. VALIDAMOS QUE LA VARIABLE SE LLAME 'equipo'
    if (!codigoLower.includes('equipo')) {
      this.consolaLogs.push({mensaje: 'Error: La variable debe llamarse "equipo".', tipo: 'log-error'});
      return;
    }

    // 3. VALIDAMOS QUE ASIGNE EL TEXTO CORRECTO
    // Buscamos "escudo dorado" (en minúscula por el toLowerCase)
    if (!codigoLower.includes('"escudo dorado"') && !codigoLower.includes("'escudo dorado'")) {
      this.consolaLogs.push({mensaje: 'Error: Debes guardar el texto "Escudo Dorado" en la variable.', tipo: 'log-error'});
      return;
    }

    // 4. VALIDAMOS EL CONSOLE.LOG
    if (!codigoLower.includes('console.log')) {
      this.consolaLogs.push({mensaje: 'Error: Falta mostrar el objeto con console.log().', tipo: 'log-error'});
      return;
    }

    // ¡ÉXITO!
    // Simulamos la salida de la consola real
    this.consolaLogs.push({mensaje: '> Ejecutando script...', tipo: 'log-info'});
    
    setTimeout(() => {
      this.consolaLogs.push({mensaje: 'Escudo Dorado', tipo: 'log-success'});
      this.consolaLogs.push({mensaje: '¡OBJETO INVOCADO CON ÉXITO!', tipo: 'log-success'});
      this.nivelCompletado = true;
    }, 500);
  }

  irSiguienteNivel() {
    this.auth.ganarXP(300); // 300 XP por ser el primer nivel de JS
    // Aquí irías al nivel 10 o volverías a misiones
    this.router.navigate(['/misiones']); 
  }
}