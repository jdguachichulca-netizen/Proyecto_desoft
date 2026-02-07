import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nivel2',
  templateUrl: './nivel2.page.html',
  styleUrls: ['./nivel2.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon]
})
export class Nivel2Page {

  // Inyecciones de dependencias
  private auth = inject(AuthService);
  private router = inject(Router);

  // Variable donde se guarda lo que escribe el usuario
  codigoUsuario: string = 'Algoritmo Recargar\n\t\nFinAlgoritmo';
  
  // Estado del nivel
  nivelCompletado: boolean = false;
  
  // Logs de la consola simulada
  consolaLogs: {mensaje: string, tipo: string}[] = [
    {mensaje: 'Sistema de energía: 0%', tipo: 'error'},
    {mensaje: 'Esperando asignación de variable...', tipo: 'info'}
  ];

  constructor() { }

  ejecutarCodigo() {
    // 1. Limpiamos el código
    const codigoLimpio = this.codigoUsuario.toLowerCase().replace(/\s+/g, '');

    // 2. Validamos si escribió la asignación correcta
    if (codigoLimpio.includes('energia<-100') || codigoLimpio.includes('energia=100')) {
      
      // ¡ÉXITO!
      this.nivelCompletado = true;
      this.consolaLogs.push({mensaje: '> Creando variable [energia]...', tipo: 'info'});
      this.consolaLogs.push({mensaje: '> Asignando valor: 100', tipo: 'info'});
      this.consolaLogs.push({mensaje: '¡SISTEMAS OPERATIVOS! BATERÍA AL 100%', tipo: 'success'});

    } else {
      
      // ERROR
      this.consolaLogs.push({mensaje: 'Error: La sintaxis incorrecta.', tipo: 'error'});
      this.consolaLogs.push({mensaje: 'Pista: Usa la flecha para asignar -> energia <- 100', tipo: 'info'});
    }
  }

  // 👇👇👇 AQUÍ ESTÁ EL CAMBIO PARA GUARDAR EL PROGRESO 👇👇👇
  finalizarMision() {
    // ANTES: this.auth.ganarXP(50); 
    
    // AHORA: Guardamos nivel, subimos habilidad LÓGICA y damos XP
    // Parámetros: ('ID_NIVEL', 'TIPO_HABILIDAD', XP)
    this.auth.completarNivel('nivel2', 'logica', 50);

    // Nota: He puesto 'logica' porque las variables son la base de la lógica.
    // Así subirá la barra azul en tu inicio.

    this.router.navigate(['/nivel3']); 
  }
}