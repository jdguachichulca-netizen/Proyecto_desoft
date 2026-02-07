import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone'; // 👈 Agregamos IonIcon
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { cube, checkmarkCircle } from 'ionicons/icons'; // 👈 Iconos para Arrays

@Component({
  selector: 'app-nivel7',
  templateUrl: './nivel7.page.html',
  styleUrls: ['./nivel7.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon] // 👈 No olvides ponerlo aquí
})
export class Nivel7Page {
  
  private auth = inject(AuthService);
  private router = inject(Router);

  codigoUsuario: string = 'Algoritmo Carga\n\t\n\t// 1. Define la Dimension\n\t\n\t// 2. Guarda los valores\n\t\nFinAlgoritmo';

  nivelCompletado: boolean = false;
  // Representación visual del Array
  carga: (number | null)[] = [null, null, null]; 
  
  consolaLogs: any[] = [{mensaje: 'Sistema de carga listo. Esperando instrucciones...', tipo: 'info'}];

  constructor() { 
    // Registramos iconos (cubo representa el Array/Caja)
    addIcons({ cube, checkmarkCircle });
  }

  ejecutarCodigo() {
    // 1. Limpieza EXTREMA
    const codigo = this.codigoUsuario.toLowerCase().replace(/\s+/g, ''); 
    
    this.consolaLogs = [];
    this.carga = [null, null, null]; 

    // --- VALIDACIÓN ---

    // Paso 1: Buscar la dimensión
    if (codigo.includes('dimensioncarga[3]')) {
      this.consolaLogs.push({mensaje: '> Estante creado correctamente.', tipo: 'info'});
    } else {
      this.consolaLogs.push({mensaje: 'Error: Falta "Dimension carga[3]"', tipo: 'error'});
      return; 
    }

    let aciertos = 0;

    // Paso 2: Validar asignaciones
    if (codigo.includes('carga[1]<-10') || codigo.includes('carga[1]=10')) {
      this.carga[0] = 10;
      this.consolaLogs.push({mensaje: '> Slot [1] OK.', tipo: 'success'});
      aciertos++;
    }

    if (codigo.includes('carga[2]<-20') || codigo.includes('carga[2]=20')) {
      this.carga[1] = 20;
      this.consolaLogs.push({mensaje: '> Slot [2] OK.', tipo: 'success'});
      aciertos++;
    }

    if (codigo.includes('carga[3]<-30') || codigo.includes('carga[3]=30')) {
      this.carga[2] = 30;
      this.consolaLogs.push({mensaje: '> Slot [3] OK.', tipo: 'success'});
      aciertos++;
    }

    // RESULTADO
    if (aciertos === 3) {
      this.consolaLogs.push({mensaje: '¡SISTEMA AL 100%!', tipo: 'success'});
      this.nivelCompletado = true;
    } else {
      this.consolaLogs.push({mensaje: `Has llenado ${aciertos}/3 espacios. Revisa los valores.`, tipo: 'error'});
    }
  }

  // 👇👇👇 AQUÍ ESTÁ EL CAMBIO PARA GUARDAR PROGRESO 👇👇👇
  finalizarMision() {
    // ANTES: this.auth.ganarXP(200);

    // AHORA: Guardamos nivel, subimos habilidad LÓGICA (Arrays/Estructuras) y damos XP
    this.auth.completarNivel('nivel7', 'logica', 200);
    
    // Arrays = Estructura de Datos = Lógica Pura
    
    this.router.navigate(['/nivel8']); 
  }
}