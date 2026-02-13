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

  // Código inicial limpio
  codigoUsuario: string = `// 1. Define las variables
let modelo = "W-BIT v2";
// Crea la variable 'estado' aquí...

// 2. Une las piezas (Escribe tu console.log abajo)

`;
  
  nivelCompletado: boolean = false;
  mensajeSalida: string = ''; 
  consolaLogs: { mensaje: string, tipo: 'info' | 'success' | 'error' }[] = [];

  constructor() {
    addIcons({ play });
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    this.mensajeSalida = '';
    const codigo = this.codigoUsuario;

    this.consolaLogs.push({ mensaje: 'Compilando fusión de datos...', tipo: 'info' });

    // --- VALIDACIÓN PASO A PASO ---

    // 1. Validar variable 'modelo'
    if (!codigo.includes('let modelo = "W-BIT v2"') && !codigo.includes("let modelo = 'W-BIT v2'")) {
      this.logsError('Falta definir: let modelo = "W-BIT v2";');
      return;
    }

    // 👇 CAMBIO 1: AHORA ACEPTAMOS "operativo" EN MINÚSCULA
    const tieneEstado = 
      codigo.includes('let estado = "Operativo"') || 
      codigo.includes("let estado = 'Operativo'") ||
      codigo.includes('let estado = "operativo"') || 
      codigo.includes("let estado = 'operativo'");

    if (!tieneEstado) {
      this.logsError('Falta definir: let estado = "Operativo";');
      return;
    }

    // 3. Validar console.log y el uso de '+'
    if (!codigo.includes('console.log') || !codigo.includes('+')) {
      this.logsError('Debes usar console.log() y el símbolo "+" para unir.');
      return;
    }

    // 4. Validar la palabra "esta" / "está" (Flexible)
    const tieneLaPalabra = 
      codigo.includes('"está"') || codigo.includes("'está'") || 
      codigo.includes('"esta"') || codigo.includes("'esta'"); 

    if (!tieneLaPalabra) {
      this.logsError('Falta concatenar el texto intermedio: + "está" +');
      return;
    }

    // --- ÉXITO ---
    setTimeout(() => {
      // Autocorrección Visual: Siempre mostramos la frase perfecta
      this.mensajeSalida = "W-BIT v2 está Operativo";
      
      this.consolaLogs.push({ mensaje: 'Concatenación detectada.', tipo: 'success' });
      
      // Mensaje amable si detectamos minúsculas o falta de espacios
      const necesitaCorreccion = !codigo.includes('" está "') || !codigo.includes("Operativo");
      
      if (necesitaCorreccion) {
         this.consolaLogs.push({ mensaje: ' Auto-ajustando mayúsculas y espacios...', tipo: 'info' });
      }

      this.consolaLogs.push({ mensaje: 'SISTEMA RESTAURADO.', tipo: 'success' });
      
      this.nivelCompletado = true;
    }, 500);
  }

  logsError(mensaje: string) {
    setTimeout(() => {
      this.consolaLogs.push({ mensaje: ` ERROR: ${mensaje}`, tipo: 'error' });
    }, 400);
  }

  guardarProgreso() {
    this.auth.completarNivel('nivel10', 'sintaxis', 250);
    this.router.navigate(['/nivel11']); 
  }
}