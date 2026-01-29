import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone'; // Quitamos IonIcon si no lo usamos, o lo dejamos si agregamos iconos
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nivel7',
  templateUrl: './nivel7.page.html',
  styleUrls: ['./nivel7.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class Nivel7Page {
  
  private auth = inject(AuthService);
  private router = inject(Router);

  codigoUsuario: string = 'Algoritmo Carga\n\t\n\t// 1. Define la Dimension\n\t\n\t// 2. Guarda los valores\n\t\nFinAlgoritmo';

  nivelCompletado: boolean = false;
  // Este arreglo representa los datos REALES que visualizamos en pantalla
  // Inicialmente null (vacío)
  carga: (number | null)[] = [null, null, null]; 
  
  consolaLogs: any[] = [{mensaje: 'Sistema de carga listo. Esperando instrucciones...', tipo: 'info'}];

  constructor() { }

 ejecutarCodigo() {
    // 1. Limpieza EXTREMA: Quitamos espacios, tabulaciones y saltos de línea
    const codigo = this.codigoUsuario.toLowerCase().replace(/\s+/g, ''); 
    
    this.consolaLogs = [];
    this.carga = [null, null, null]; // Reiniciamos visuales

    // --- VALIDACIÓN MÁS FLEXIBLE ---

    // Paso 1: Buscar la dimensión (acepta "dimensioncarga[3]" todo junto)
    if (codigo.includes('dimensioncarga[3]')) {
      this.consolaLogs.push({mensaje: '> Estante creado correctamente.', tipo: 'info'});
    } else {
      this.consolaLogs.push({mensaje: 'Error: Falta "Dimension carga[3]"', tipo: 'error'});
      return; 
    }

    let aciertos = 0;

    // Paso 2: Validar asignaciones (Soporta flecha <- o igual =)
    // Slot 1
    if (codigo.includes('carga[1]<-10') || codigo.includes('carga[1]=10')) {
      this.carga[0] = 10;
      this.consolaLogs.push({mensaje: '> Slot [1] OK.', tipo: 'success'});
      aciertos++;
    }

    // Slot 2
    if (codigo.includes('carga[2]<-20') || codigo.includes('carga[2]=20')) {
      this.carga[1] = 20;
      this.consolaLogs.push({mensaje: '> Slot [2] OK.', tipo: 'success'});
      aciertos++;
    }

    // Slot 3
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

  finalizarMision() {
    this.auth.ganarXP(200);
    this.router.navigate(['/nivel8']); // O al nivel 8 si seguimos
  }
}