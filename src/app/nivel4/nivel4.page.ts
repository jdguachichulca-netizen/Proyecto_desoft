import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { nuclear } from 'ionicons/icons'; // Usamos el icono nuclear como ventilador
import { warning } from 'ionicons/icons';

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

  // Código inicial con la estructura sugerida vacía
  codigoUsuario: string = 'Algoritmo Termostato\n\tDefinir temperatura Como Entero\n\ttemperatura <- 80\n\t\n\t// Escribe tu condicional aquí abajo\n\t\nFinAlgoritmo';

  nivelCompletado: boolean = false;
  consolaLogs: any[] = [{mensaje: 'LECTURA DE SENSOR: 80°C', tipo: 'error'}];

  constructor() {
    addIcons({ nuclear, warning }); // Registramos el icono
  }

  ejecutarCodigo() {
    // Normalizamos el código para validarlo fácil
    const codigo = this.codigoUsuario.toLowerCase().replace(/\s+/g, ' ');

    // LÓGICA DE VALIDACIÓN:
    // 1. Debe tener "si"
    // 2. Debe comparar temperatura > 50 (o un número similar)
    // 3. Debe tener "entonces"
    // 4. Debe tener una acción adentro (escribir)
    
    if (codigo.includes('si temperatura > 50') || codigo.includes('si temperatura>50')) {
      
      if (codigo.includes('entonces')) {
        
        // ¡CÓDIGO CORRECTO!
        this.nivelCompletado = true;
        
        this.consolaLogs = []; // Limpiamos
        this.consolaLogs.push({mensaje: '> Evaluando: 80 > 50 ... VERDADERO', tipo: 'info'});
        this.consolaLogs.push({mensaje: '> Ejecutando rama ENTONCES...', tipo: 'info'});
        this.consolaLogs.push({mensaje: '> SISTEMA: Activando ventiladores de emergencia.', tipo: 'success'});
        this.consolaLogs.push({mensaje: '¡TEMPERATURA ESTABILIZADA! +50 XP', tipo: 'success'});

      } else {
        this.consolaLogs.push({mensaje: 'Error: Falta la palabra clave "Entonces".', tipo: 'error'});
      }

    } else {
      this.consolaLogs.push({mensaje: 'Error: La condición no es correcta. Usa: Si temperatura > 50', tipo: 'error'});
    }
  }

  // EN src/app/nivel4/nivel4.page.ts

  finalizarMision() {
    this.auth.ganarXP(100);
    
    // --- CAMBIO AQUÍ: Ahora nos lleva al Nivel 5 ---
    this.router.navigate(['/nivel5']); 
  }
  
}