import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { IonContent, IonIcon } from '@ionic/angular/standalone'; 
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { rocket, warning } from 'ionicons/icons';

@Component({
  selector: 'app-nivel5',
  templateUrl: './nivel5.page.html',
  styleUrls: ['./nivel5.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon] 
})
export class Nivel5Page {
  
  private auth = inject(AuthService);
  private router = inject(Router);

  codigoUsuario: string = 'Algoritmo Despegue\n\t\n\t// Define tu variable aquí\n\t\n\tMientras ... Hacer\n\t\t// Escribe...\n\t\t// ¡No olvides sumar 1!\n\tFinMientras\nFinAlgoritmo';

  nivelCompletado: boolean = false;
  ejecutando: boolean = false; 
  motoresEncendidos: number = 0; 
  consolaLogs: any[] = [{mensaje: 'Esperando código de secuencia...', tipo: 'info'}];

  constructor() {
    addIcons({ rocket, warning }); 
  }

  async ejecutarCodigo() {
    const codigo = this.codigoUsuario.toLowerCase().replace(/\s+/g, ' ');
    this.consolaLogs = [];
    this.motoresEncendidos = 0;

    // Lógica de validación
    const tieneMientras = codigo.includes('mientras');
    const tieneLimite = codigo.includes('<4') || codigo.includes('<=4') || codigo.includes('< 4') || codigo.includes('<= 4');
    const tieneSuma = codigo.includes('+1') || codigo.includes('+ 1');

    if (tieneMientras && tieneLimite && tieneSuma) {
      
      // 👇 CAMBIO: Capturamos el texto que escribiste entre comillas
      const matchTexto = codigo.match(/escribir\s*["']([^"']+)["']/);
      // Si encontraste texto, úsalo. Si no, usa uno por defecto.
      const mensajeUsuario = matchTexto ? matchTexto[1] : 'Encendiendo motor';

      this.ejecutando = true;
      this.consolaLogs.push({mensaje: '> Código validado. Iniciando ciclo...', tipo: 'info'});
      
      // Simulación visual del bucle
      for (let i = 1; i <= 4; i++) {
        await new Promise(r => setTimeout(r, 800));
        this.motoresEncendidos = i; 
        
        // 👇 CAMBIO: Aquí mostramos TU mensaje capturado
        this.consolaLogs.push({mensaje: `> Iteración ${i}: "${mensajeUsuario}"`, tipo: 'info'});
      }

      await new Promise(r => setTimeout(r, 500));
      this.consolaLogs.push({mensaje: '¡TODOS LOS SISTEMAS OPERATIVOS!', tipo: 'success'});
      this.consolaLogs.push({mensaje: '¡DESPEGUE EXITOSO! +100 XP', tipo: 'success'});
      
      this.nivelCompletado = true;
      this.ejecutando = false;

    } else {
      if (!tieneMientras) {
        this.consolaLogs.push({mensaje: 'Error: No se encontró el comando "Mientras".', tipo: 'error'});
      } else if (!tieneLimite) {
        this.consolaLogs.push({mensaje: 'Error: La condición debe llegar hasta 4. (Ej: motor <= 4)', tipo: 'error'});
      } else if (!tieneSuma) {
        this.consolaLogs.push({mensaje: 'ALERTA CRÍTICA: Bucle infinito detectado.', tipo: 'error'});
        this.consolaLogs.push({mensaje: 'Te falta sumar 1 a la variable (variable <- variable + 1)', tipo: 'error'});
      }
    }
  }

  finalizarMision() {
    this.auth.ganarXP(100); 
    this.router.navigate(['/nivel6']); 
  }
}