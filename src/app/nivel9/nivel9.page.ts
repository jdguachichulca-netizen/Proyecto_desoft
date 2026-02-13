import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { planet, codeSlash, terminal } from 'ionicons/icons';

@Component({
  selector: 'app-nivel9',
  templateUrl: './nivel9.page.html',
  styleUrls: ['./nivel9.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon]
})
export class Nivel9Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  // Código inicial con comentario estilo JS
  codigoUsuario: string = '// Inicializa el sistema de comunicación\n\n';
  
  nivelCompletado: boolean = false;
  mensajeSistema: string = 'ESPERANDO SEÑAL...'; 
  consolaLogs: any[] = [];

  constructor() {
    addIcons({ planet, codeSlash, terminal });
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    const codigo = this.codigoUsuario.trim();

    // Validamos que use let y console.log (Regex básica para JS)
    const tieneLet = /let\s+[a-zA-Z0-9_]+\s*=\s*["'].+["'];?/.test(codigo);
    const tieneConsole = /console\.log\([a-zA-Z0-9_]+\);?/.test(codigo);

    if (tieneLet && tieneConsole) {
      
      // Capturamos el texto (ej: "SISTEMA ONLINE")
      const matchTexto = codigo.match(/["']([^"']+)["']/);
      const textoMensaje = matchTexto ? matchTexto[1] : 'SISTEMA ONLINE'; 

      this.mensajeSistema = textoMensaje;
      
      this.consolaLogs.push({ mensaje: '> Inicializando protocolos de voz...', tipo: 'info' });
      
      setTimeout(() => {
        // Simulamos el éxito
        this.consolaLogs.push({ mensaje: `> NÚCLEO DE VOZ: "${textoMensaje}"`, tipo: 'success' });
        this.consolaLogs.push({ mensaje: `> ¡W-BIT HA RECUPERADO EL HABLA!`, tipo: 'success' });
        this.nivelCompletado = true;
      }, 1000);

    } else {
        // Errores específicos para ayudar al estudiante
        this.consolaLogs.push({ mensaje: ' Error de Sintaxis JavaScript:', tipo: 'error' });
        if (!tieneLet) this.consolaLogs.push({ mensaje: '- Debes declarar la variable usando "let nombre = ..."', tipo: 'error' });
        if (!tieneConsole) this.consolaLogs.push({ mensaje: '- Debes imprimir usando "console.log(nombre)"', tipo: 'error' });
    }
  }

  // 👇👇👇 AQUÍ ESTÁ EL CAMBIO IMPORTANTE 👇👇👇
  siguienteNivel() {
    // ANTES: this.auth.ganarXP(200);
    
    // AHORA: Guardamos nivel, subimos SINTAXIS (Por ser JavaScript) y damos XP
    this.auth.completarNivel('nivel9', 'sintaxis', 200);

    // Volvemos a misiones (o a donde desees)
    this.router.navigate(['/nivel10']); 
  }
}