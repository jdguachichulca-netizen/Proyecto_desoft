import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router'; // Agregamos RouterLink
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { lockClosed } from 'ionicons/icons';

@Component({
  selector: 'app-nivel3',
  templateUrl: './nivel3.page.html',
  styleUrls: ['./nivel3.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon, RouterLink] // RouterLink aquí
})
export class Nivel3Page {
  
  auth = inject(AuthService); // Public para usarlo en el HTML (avatar)
  private router = inject(Router);

  codigoUsuario: string = 'Algoritmo Identidad\n\t\nFinAlgoritmo';
  
  // Estados: 'bloqueado', 'esperando' (input), 'completado' (id card)
  estado: 'bloqueado' | 'esperando' | 'completado' = 'bloqueado';
  
  nombreComandante: string = ''; // Aquí guardaremos lo que escriba el usuario
  consolaLogs: any[] = [{mensaje: 'Sistema Bloqueado. Esperando protocolo...', tipo: 'error'}];

  constructor() {
    addIcons({ lockClosed });
  }

  ejecutarCodigo() {
    const codigo = this.codigoUsuario.toLowerCase().replace(/\s+/g, ' ');

    // Validación: Busca "leer" seguido de cualquier cosa
    if (codigo.includes('leer ')) {
      
      this.estado = 'esperando';
      
      // --- MENSAJES QUE EXPLICAN LO QUE PASA ---
      this.consolaLogs = []; // Limpiamos consola anterior
      this.consolaLogs.push({mensaje: '> Ejecutando línea 1: Algoritmo...', tipo: 'info'});
      this.consolaLogs.push({mensaje: '> Ejecutando línea 2: Leer nombre...', tipo: 'info'});
      this.consolaLogs.push({mensaje: 'PAUSA DEL SISTEMA: El programa se ha detenido esperando datos del usuario.', tipo: 'warning'});
      this.consolaLogs.push({mensaje: '>> Por favor, escribe en la pantalla de la derecha.', tipo: 'success'});

    } else {
      this.consolaLogs.push({mensaje: 'Error: No encuentro el comando "Leer". Intenta: Leer nombre', tipo: 'error'});
    }
  }

  confirmarNombre() {
    if (this.nombreComandante.trim().length > 0) {
      this.estado = 'completado';
      
      // --- CONFIRMACIÓN DE QUE EL DATO SE GUARDÓ ---
      this.consolaLogs.push({mensaje: `> Dato recibido: "${this.nombreComandante}"`, tipo: 'info'});
      this.consolaLogs.push({mensaje: `> Guardado en memoria: variable [nombre] <- "${this.nombreComandante}"`, tipo: 'info'});
      this.consolaLogs.push({mensaje: '¡ACCESO CONCEDIDO! +50 XP', tipo: 'success'});
    }
  }

  finalizarMision() {
    this.auth.ganarXP(50);
    // Aquí podrías ir al nivel 4 o volver a misiones
    this.router.navigate(['/nivel4']); 
  }
}