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
  
  // Estado del nivel (false = Batería vacía, true = Batería llena)
  nivelCompletado: boolean = false;
  
  // Logs de la consola simulada
  consolaLogs: {mensaje: string, tipo: string}[] = [
    {mensaje: 'Sistema de energía: 0%', tipo: 'error'},
    {mensaje: 'Esperando asignación de variable...', tipo: 'info'}
  ];

  constructor() { }

  ejecutarCodigo() {
    // 1. Limpiamos el código (quitamos espacios y pasamos a minúsculas)
    // Esto permite que "energia <- 100", "Energia = 100", etc., funcionen igual.
    const codigoLimpio = this.codigoUsuario.toLowerCase().replace(/\s+/g, '');

    // 2. Validamos si escribió la asignación correcta
    // Aceptamos tanto la flecha de PSeInt (<-) como el igual (=)
    if (codigoLimpio.includes('energia<-100') || codigoLimpio.includes('energia=100')) {
      
      // ¡ÉXITO!
      this.nivelCompletado = true;
      this.consolaLogs.push({mensaje: '> Creando variable [energia]...', tipo: 'info'});
      this.consolaLogs.push({mensaje: '> Asignando valor: 100', tipo: 'info'});
      this.consolaLogs.push({mensaje: '¡SISTEMAS OPERATIVOS! BATERÍA AL 100%', tipo: 'success'});
      
      // Opcional: Sumar XP aquí si no lo haces en el botón de continuar
      // this.auth.ganarXP(50); 

    } else {
      
      // ERROR
      this.consolaLogs.push({mensaje: 'Error: La sintaxis incorrecta.', tipo: 'error'});
      this.consolaLogs.push({mensaje: 'Pista: Usa la flecha para asignar -> energia <- 100', tipo: 'info'});
    }
  }

  // Función para volver al menú de misiones y sumar XP
  finalizarMision() {
    this.auth.ganarXP(50); 
    this.router.navigate(['/nivel3']); // <--- AHORA VAMOS AL NIVEL 3
  }
}