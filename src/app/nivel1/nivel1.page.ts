import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.page.html',
  styleUrls: ['./nivel1.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon]
})
export class Nivel1Page {

  private auth = inject(AuthService); 
  private router = inject(Router);    

  codigoUsuario: string = 'Algoritmo DespertarRobot\n\t\nFinAlgoritmo';

  robotDespierto: boolean = false;
  consolaLogs: {mensaje: string, tipo: string}[] = [
    {mensaje: 'Iniciando secuencia...', tipo: 'info'},
    {mensaje: 'Esperando comandos...', tipo: 'info'}
  ];

  constructor() { }

  ejecutarCodigo() {
    const codigoLimpio = this.codigoUsuario.toLowerCase().replace(/\s+/g, ' ');

    if (codigoLimpio.includes('escribir "hola mundo"')) {
      
      this.robotDespierto = true;
      this.consolaLogs.push({mensaje: '> Ejecutando línea 2...', tipo: 'info'});
      this.consolaLogs.push({mensaje: 'R-B1T dice: "Hola Mundo"', tipo: 'success'});
      this.consolaLogs.push({mensaje: '¡MISIÓN CUMPLIDA! +50 XP', tipo: 'success'});

    } else {
      
      this.robotDespierto = false;
      this.consolaLogs.push({mensaje: 'Error de sintaxis: Comando no reconocido o texto incorrecto.', tipo: 'error'});
      this.consolaLogs.push({mensaje: 'Pista: Usa Escribir "Hola Mundo"', tipo: 'info'});
    }
  }

  // 👇👇👇 AQUÍ ESTÁ EL CAMBIO IMPORTANTE 👇👇👇
  avanzarNivel() {
    
    this.auth.completarNivel('nivel1', 'sintaxis', 50); 
    

    this.router.navigate(['/nivel2']); 
  }
}