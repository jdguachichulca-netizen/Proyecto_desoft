import { Component, inject } from '@angular/core'; // <--- Agregamos inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // <--- Importante para navegar
import { AuthService } from '../auth.service'; // <--- Importante para la XP

@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.page.html',
  styleUrls: ['./nivel1.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon]
})
export class Nivel1Page {

  // --- INYECCIÓN DE SERVICIOS ---
  private auth = inject(AuthService); // Para manejar la XP
  private router = inject(Router);    // Para cambiar de página

  // Lo que escribe el usuario
  codigoUsuario: string = 'Algoritmo DespertarRobot\n\t\nFinAlgoritmo';

  // Estado del juego
  robotDespierto: boolean = false;
  consolaLogs: {mensaje: string, tipo: string}[] = [
    {mensaje: 'Iniciando secuencia...', tipo: 'info'},
    {mensaje: 'Esperando comandos...', tipo: 'info'}
  ];

  constructor() { }

  ejecutarCodigo() {
    // 1. Limpiamos y normalizamos el texto para comparar fácil
    // (Quitamos espacios extra y lo hacemos minúsculas)
    const codigoLimpio = this.codigoUsuario.toLowerCase().replace(/\s+/g, ' ');

    // 2. Verificamos si escribió el comando correcto
    // Buscamos: escribir "hola mundo"
    if (codigoLimpio.includes('escribir "hola mundo"')) {
      
      // ¡ÉXITO!
      this.robotDespierto = true;
      this.consolaLogs.push({mensaje: '> Ejecutando línea 2...', tipo: 'info'});
      this.consolaLogs.push({mensaje: 'R-B1T dice: "Hola Mundo"', tipo: 'success'});
      this.consolaLogs.push({mensaje: '¡MISIÓN CUMPLIDA! +50 XP', tipo: 'success'});

    } else {
      
      // ERROR
      this.robotDespierto = false;
      this.consolaLogs.push({mensaje: 'Error de sintaxis: Comando no reconocido o texto incorrecto.', tipo: 'error'});
      this.consolaLogs.push({mensaje: 'Pista: Usa Escribir "Hola Mundo"', tipo: 'info'});
    }
  }

  // --- NUEVA FUNCIÓN: Se ejecuta al dar clic en CONTINUAR ---
  avanzarNivel() {
    this.auth.ganarXP(50); // 1. Sumamos 50 puntos al usuario
    this.router.navigate(['/nivel2']); // 2. Nos vamos a la página del Nivel 2
  }
}