import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nivel15',
  templateUrl: './nivel15.page.html',
  styleUrls: ['./nivel15.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Nivel15Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  @ViewChild('matrixCanvas', { static: false }) matrixCanvas!: ElementRef<HTMLCanvasElement>;

  textoBase: string = `// Define el objeto wbit
let wbit = {
  // Propiedades aquí...
};
`;

  codigoUsuario: string = this.textoBase;
  consolaLogs: { mensaje: string, tipo: string }[] = [];
  mensajeSistema: string = '';
  
  nivelCompletado: boolean = false;
  showMatrix: boolean = false;
  
  // 🆕 NUEVA VARIABLE: Para mostrar el botón final antes de la Matrix
  botonFinalVisible: boolean = false;

  dataObjeto: any = { id: '', sistema: '', nivel: '' };

  constructor() {}

  limpiarTerminal() {
    if (this.codigoUsuario === this.textoBase) {
      this.codigoUsuario = '';
    }
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    this.mensajeSistema = "COMPILANDO NÚCLEO...";
    const codigo = this.codigoUsuario; // No usamos trim() agresivo para respetar sintaxis

    // 1. Validar declaración de objeto
    if (!codigo.includes('let wbit = {') && !codigo.includes('const wbit = {')) {
      this.logError(" Error: Debes iniciar con 'let wbit = {'");
      return;
    }

    if (!codigo.includes('}')) {
      this.logError(" Error: Falta cerrar el objeto con '}'");
      return;
    }

    // --- VALIDACIONES ESTRICTAS CON REGEX ---
    // Buscamos patrones exactos sin importar espacios extra

    // A. Validar ID: "W-BIT"
    // Busca: id seguido de : seguido de comillas W-BIT comillas
    const regexId = /id\s*:\s*["']W-BIT["']/i; 
    if (!regexId.test(codigo)) {
       this.logError("Error: id debe ser exactamente \"W-BIT\"");
       return;
    }

    // B. Validar Sistema: "Online"
    const regexSistema = /sistema\s*:\s*["']Online["']/i;
    if (!regexSistema.test(codigo)) {
       this.logError(" Error: sistema debe ser \"Online\"");
       return;
    }

    // C. Validar Nivel: 15 (ESTRICTO)
    // Busca 'nivel', dos puntos, el 15, y asegura que NO haya otro número después (?!\d)
    const regexNivel = /nivel\s*:\s*15(?!\d)/; 
    if (!regexNivel.test(codigo)) {
       this.logError("⚠️ Error Crítico: El nivel debe ser EXACTAMENTE 15.");
       return;
    }

    // ÉXITO
    this.simularCreacion();
  }

  simularCreacion() {
    this.consolaLogs.push({ mensaje: "Estructura válida. Sincronizando...", tipo: 'info' });
    
    // Animación de datos en el panel derecho
    setTimeout(() => { this.dataObjeto.id = "W-BIT"; }, 500);
    setTimeout(() => { this.dataObjeto.sistema = "Online"; }, 1000);
    setTimeout(() => { 
      this.dataObjeto.nivel = 15; 
      this.nivelCompletado = true;
      this.consolaLogs.push({ mensaje: "CONCIENCIA ESTABLECIDA.", tipo: 'success' });
      this.mensajeSistema = "NÚCLEO ESTABLE";
      
      // 🆕 EN LUGAR DE ENTRAR A MATRIX, MOSTRAMOS EL BOTÓN
      this.botonFinalVisible = true;

    }, 1500);
  }

  // Esta función se llama al hacer clic en el botón rojo
  activarSecuenciaFinal() {
    this.botonFinalVisible = false; // Ocultamos botón
    this.iniciarFinalEpico();
  }

  iniciarFinalEpico() {
    this.showMatrix = true;
    setTimeout(() => {
      this.dibujarMatrix();
    }, 50);
  }

  dibujarMatrix() {
    const canvas = this.matrixCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letras = "010101WBITJAVASCRIPT";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0"; 
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letras.charAt(Math.floor(Math.random() * letras.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    setTimeout(() => {
      clearInterval(interval);
      this.auth.completarNivel('nivel15', 'sintaxis', 800);
      
      // Desbloqueamos la misión final
      this.auth.desbloquearMisionFinal(); 
      
      this.router.navigate(['/misiones']); 
    }, 6000);
  }

  logError(msg: string) {
    this.consolaLogs.push({ mensaje: msg, tipo: 'error' });
    this.mensajeSistema = "ERROR SINTAXIS";
  }
}