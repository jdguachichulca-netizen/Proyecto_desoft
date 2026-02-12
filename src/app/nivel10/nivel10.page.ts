import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { play } from 'ionicons/icons';

@Component({
  selector: 'app-nivel10',
  templateUrl: './nivel10.page.html',
  styleUrls: ['./nivel10.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonButton, IonIcon]
})
export class Nivel10Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  // Código inicial para ayudar al usuario
  codigoUsuario: string = `// 1. Define las variables fragmentadas
let modelo = "W-BIT v2";
// Define la variable 'estado' aquí...

// 2. Une las piezas en la consola
// console.log("Identidad: " + ... + " Estado: " + ...);
`;
  
  nivelCompletado: boolean = false;
  consolaLogs: { mensaje: string, tipo: 'info' | 'success' | 'error' }[] = [];

  constructor() {
    addIcons({ play });
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    const codigo = this.codigoUsuario.trim();

    this.consolaLogs.push({ mensaje: 'Analizando sintaxis de unión...', tipo: 'info' });

    // --- VALIDACIONES ---

    // 1. Validar que haya al menos DOS declaraciones 'let'
    // Usamos una expresión regular (regex) para contar las ocurrencias de "let "
    const matchLet = codigo.match(/let\s+[a-zA-Z0-9_]+/g);
    const cantidadVariables = matchLet ? matchLet.length : 0;

    if (cantidadVariables < 2) {
      this.logsError('Faltan variables. Debes definir al menos dos (modelo y estado).');
      return;
    }

    // 2. Validar que exista un console.log que use el operador '+' para unir
    // Esta regex busca: console.log( ... cualquier cosa ... + ... cualquier cosa ... )
    const tieneConsoleConSuma = /console\.log\(.*[\w"']\s*\+\s*[\w"'].*\)/.test(codigo);

    if (!tieneConsoleConSuma) {
      this.logsError('No se detectó una unión. Usa el símbolo "+" dentro de console.log() para juntar texto y variables.');
      return;
    }

    // --- ÉXITO ---
    // Si pasa las validaciones, simulamos una ejecución exitosa.
    // En un entorno real, usaríamos eval() o new Function(), pero por seguridad lo simulamos.
    
    setTimeout(() => {
      this.consolaLogs = []; // Limpiamos logs anteriores
      // Simulamos el resultado esperado basado en las instrucciones
      this.consolaLogs.push({ mensaje: 'Identidad: W-BIT v2 Estado: Operativo', tipo: 'success' });
      this.consolaLogs.push({ mensaje: '--------------------------------', tipo: 'info' });
      this.consolaLogs.push({ mensaje: '¡IDENTIDAD RECONSTRUIDA EXITOSAMENTE!', tipo: 'success' });
      
      this.nivelCompletado = true;
      this.guardarProgreso();
    }, 800); // Pequeño delay para realismo
  }

  logsError(mensaje: string) {
    setTimeout(() => {
      this.consolaLogs.push({ mensaje: `❌ ERROR SINTAXIS: ${mensaje}`, tipo: 'error' });
    }, 400);
  }

  guardarProgreso() {
    // Guardamos el nivel 10. Damos más XP porque es un concepto nuevo.
    // Seguimos en 'sintaxis' porque JS requiere precisión al escribir las uniones.
    this.auth.completarNivel('nivel10', 'sintaxis', 250);
    
    setTimeout(() => {
      // Redirigir a misiones o al siguiente nivel después de un momento de celebración
      this.router.navigate(['/nivel11']);
    }, 3000);
  }
}