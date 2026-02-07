import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { nuclear, warning } from 'ionicons/icons';

@Component({
  selector: 'app-nivel4',
  templateUrl: './nivel4.page.html',
  styleUrls: ['./nivel4.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon]
})
export class Nivel4Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  codigoUsuario: string = 'Algoritmo Termostato\n\tDefinir temperatura Como Entero\n\ttemperatura <- 80\n\t\n\t// Escribe tu condicional aquí abajo\n\t\nFinAlgoritmo';

  nivelCompletado: boolean = false;
  consolaLogs: any[] = [{mensaje: 'LECTURA DE SENSOR: 80°C', tipo: 'error'}];

  constructor() {
    addIcons({ nuclear, warning }); 
  }

  ejecutarCodigo() {
    const codigo = this.codigoUsuario.toLowerCase().replace(/\s+/g, ' ');

    // LÓGICA DE VALIDACIÓN:
    if (codigo.includes('si temperatura > 50') || codigo.includes('si temperatura>50')) {
      
      if (codigo.includes('entonces')) {
        
        // Validación de cierre
        if (!codigo.includes('finsi')) {
          this.consolaLogs.push({
            mensaje: ' Error Crítico: Debes cerrar el bloque con "FinSi".', 
            tipo: 'error'
          });
          return; 
        }

        // ¡CÓDIGO CORRECTO!
        this.nivelCompletado = true;
        
        this.consolaLogs = []; 
        this.consolaLogs.push({mensaje: '> Evaluando: 80 > 50 ... VERDADERO', tipo: 'info'});
        this.consolaLogs.push({mensaje: '> Ejecutando rama ENTONCES...', tipo: 'info'});
        this.consolaLogs.push({mensaje: '> SISTEMA: Activando ventiladores de emergencia.', tipo: 'success'});
        this.consolaLogs.push({mensaje: '¡TEMPERATURA ESTABILIZADA! +100 XP', tipo: 'success'});

      } else {
        this.consolaLogs.push({mensaje: 'Error: Falta la palabra clave "Entonces".', tipo: 'error'});
      }

    } else {
      this.consolaLogs.push({mensaje: 'Error: La condición no es correcta. Usa: Si temperatura > 50', tipo: 'error'});
    }
  }

  // 👇👇👇 AQUÍ ESTÁ EL CAMBIO PARA GUARDAR PROGRESO 👇👇👇
  finalizarMision() {
    // ANTES: this.auth.ganarXP(100);
    
    // AHORA: Guardamos nivel, subimos habilidad LÓGICA (Condicionales) y damos XP
    this.auth.completarNivel('nivel4', 'logica', 100);
    
    this.router.navigate(['/nivel5']); 
  }
  
}