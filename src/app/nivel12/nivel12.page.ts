import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone'; // 👈 Importamos IonIcon
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons'; 
import { cubeOutline } from 'ionicons/icons'; // 👈 El icono del cubo

@Component({
  selector: 'app-nivel12',
  templateUrl: './nivel12.page.html',
  styleUrls: ['./nivel12.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon] // 👈 Agregamos IonIcon aquí
})
export class Nivel12Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  codigoUsuario: string = '';
  nivelCompletado: boolean = false;
  consolaLogs: { mensaje: string, tipo: string }[] = [];
  mensajeSistema: string = '';

  constructor() {
    // 👇 Registramos el icono para que se vea en el HTML
    addIcons({ cubeOutline });
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    const codigo = this.codigoUsuario;

    // --- VALIDACIONES ---

    // 1. Validar BACKTICKS (`)
    if (!codigo.includes('`')) {
      this.logError('¡Error! Debes usar comillas invertidas (`) para el holograma.');
      return;
    }

    // 2. Validar interpolación ${}
    if (!codigo.includes('${')) {
      this.logError('No se detectaron variables. Usa ${nombreVariable} dentro del texto.');
      return;
    }

    // 3. Validar variables
    if (!codigo.includes('let sector') || !codigo.includes('let amenaza')) {
      this.logError('Faltan las variables "sector" y "amenaza".');
      return;
    }

    // 4. Validar console.log
    if (!codigo.includes('console.log')) {
      this.logError('Falta la instrucción console.log(...)');
      return;
    }

    // --- ÉXITO ---
    this.consolaLogs.push({ mensaje: '> Calibrando holograma...', tipo: 'info' });
    
    setTimeout(() => {
      const resultado = 'Reporte: Sector Alfa limpio. Amenaza: 0';
      this.consolaLogs.push({ mensaje: `> ${resultado}`, tipo: 'success' });
      this.consolaLogs.push({ mensaje: '> PROYECCIÓN ESTABLE', tipo: 'info' });
      
      this.mensajeSistema = resultado;
      this.nivelCompletado = true;
    }, 1000);
  }

  logError(msg: string) {
    this.consolaLogs.push({ mensaje: ` ${msg}`, tipo: 'error' });
  }

  guardarProgreso() {
    this.auth.completarNivel('nivel12', 'sintaxis', 350);
    setTimeout(() => {
      this.router.navigate(['/misiones']);
    }, 500);
  }
}