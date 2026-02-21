import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nivel16',
  templateUrl: './nivel16.page.html',
  styleUrls: ['./nivel16.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class Nivel16Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  // Datos de entrada (NO EDITABLES)
  datosSensoresBase = [
    { id: 'A-99', tipo: 'asteroide', energia: 50, estado: 'inerme' },
    { id: 'B-01', tipo: 'biologico', energia: 920, estado: 'hostil' },
    { id: 'C-X5', tipo: 'basura', energia: 10, estado: 'inerme' },
    { id: 'L-FR', tipo: 'biologico', energia: 850, estado: 'neutral' }
  ];

  textoBase: string = `// DATOS DEL SENSOR (No modificar este array)
const datosSensores = [
  { id: 'A-99', tipo: 'asteroide', energia: 50, estado: 'inerme' },
  { id: 'B-01', tipo: 'biologico', energia: 920, estado: 'hostil' },
  { id: 'C-X5', tipo: 'basura', energia: 10, estado: 'inerme' },
  { id: 'L-FR', tipo: 'biologico', energia: 850, estado: 'neutral' }
];

// --- ESCRIBE TU ALGORITMO AQUÍ ABAJO ---
// Objetivo: Encuentra el ID del ser 'biologico', con energia > 800 y estado 'neutral'.

`;

  codigoUsuario: string = this.textoBase;
  consolaLogs: { mensaje: string, tipo: string }[] = [];
  mensajeSistema: string = "ESPERANDO ALGORITMO...";
  nivelCompletado: boolean = false;
  procesando: boolean = false;
  mostrarVictoria: boolean = false; // Variable para pantalla final

  targetsVisuales: any[] = [];
  currentStep: number = 1;
  totalSteps: number = 4;

  guideSteps = [
    {
      title: "PASO 1: El Contenedor",
      info: "Necesitamos guardar al objetivo. Declara una variable <code>hallazgos</code> como un array vacío <code>[]</code>.",
      hint: "let hallazgos = [];"
    },
    {
      title: "PASO 2: El Escaneo",
      info: "Recorre todos los datos usando un bucle <code>for</code>. Recuerda que la longitud se obtiene con <code>.length</code>.",
      hint: "for (let i = 0; i < datosSensores.length; i++) { ... }"
    },
    {
      title: "PASO 3: El Filtro (IF)",
      info: "Aquí está la clave. Usa un <code>if</code> con 3 condiciones unidas por <code>&&</code>. <br>⚠️ <strong>IMPORTANTE:</strong> Usa <code>datosSensores[i]</code> para acceder a cada dato.",
      hint: "if (datosSensores[i].tipo === 'biologico' && datosSensores[i].energia > 800 && ...)"
    },
    {
      title: "PASO 4: Guardar y Reportar",
      info: "Si cumple las condiciones, guarda el <code>.id</code> usando <code>.push()</code>. Al final, fuera del bucle, muestra la lista.",
      hint: "hallazgos.push(datosSensores[i].id);\n// Fuera del bucle (cierra la llave } antes):\nconsole.log(hallazgos);"
    }
  ];

  constructor() {
    this.targetsVisuales = [...this.datosSensoresBase];
  }

  nextStep() { if (this.currentStep < this.totalSteps) this.currentStep++; }
  prevStep() { if (this.currentStep > 1) this.currentStep--; }

  // Función para limpiar texto inicial
  borrarTextoInicial() {
    if (this.codigoUsuario === this.textoBase) {
      this.codigoUsuario = '';
    }
  }

  // --- LÓGICA DE VALIDACIÓN ESTRICTA ---
  ejecutarCodigo() {
    this.consolaLogs = [];
    this.mensajeSistema = "ANALIZANDO SINTAXIS...";
    
    const codigoRaw = this.codigoUsuario;
    const codigoClean = codigoRaw.replace(/\s+/g, ' ');

    // 1. Validar Array
    if (!/let\s+hallazgos\s*=\s*\[\s*\];?/.test(codigoRaw)) {
      this.logError(" ReferenceError: La variable 'hallazgos' no está definida o no es un array vacío.");
      return;
    }

    // 2. Validar Bucle
    const matchFor = codigoRaw.match(/for\s*\(\s*let\s+([a-zA-Z_]\w*)\s*=\s*0\s*;\s*\1\s*<\s*datosSensores\.length\s*;\s*\1\+\+\s*\)\s*\{/);
    if (!matchFor) {
      this.logError(" SyntaxError: Estructura del bucle 'for' inválida. Asegúrate de usar 'let i = 0' y 'i++'.");
      return;
    }
    const variableIndice = matchFor[1]; 

    // 3. Validar Índice
    const usoCorrectoIndice = new RegExp(`datosSensores\\[\\s*${variableIndice}\\s*\\]`, 'g');
    if (!usoCorrectoIndice.test(codigoRaw)) {
      this.logError(` TypeError: Debes acceder a cada elemento usando el índice: datosSensores[${variableIndice}]`);
      return;
    }

    // 4. Validar IF
    const bloqueIf = codigoRaw.match(/if\s*\(([^)]+)\)/); 
    if (!bloqueIf) {
      this.logError(" SyntaxError: No se encontró la estructura 'if (...)'.");
      return;
    }
    const condiciones = bloqueIf[1]; 

    const checkTipo = new RegExp(`datosSensores\\[\\s*${variableIndice}\\s*\\]\\.tipo\\s*===?\\s*['"]biologico['"]`);
    const checkEnergia = new RegExp(`datosSensores\\[\\s*${variableIndice}\\s*\\]\\.energia\\s*>\\s*800`);
    const checkEstado = new RegExp(`datosSensores\\[\\s*${variableIndice}\\s*\\]\\.estado\\s*===?\\s*['"]neutral['"]`);

    if (!checkTipo.test(condiciones)) {
       this.logError(` LogicError: Falta validar tipo === 'biologico'.`);
       return;
    }
    if (!checkEnergia.test(condiciones)) {
       this.logError(` LogicError: Falta validar energia > 800.`);
       return;
    }
    if (!checkEstado.test(condiciones)) {
       this.logError(` LogicError: Falta validar estado === 'neutral'.`);
       return;
    }
    if ((condiciones.match(/&&/g) || []).length < 2) {
       this.logError(" SyntaxError: Debes unir las 3 condiciones usando el operador AND (&&).");
       return;
    }

    // 5. Validar Push
    const checkPush = new RegExp(`hallazgos\\.push\\(\\s*datosSensores\\[\\s*${variableIndice}\\s*\\]\\.id\\s*\\)`);
    if (!checkPush.test(codigoClean)) {
       this.logError(" LogicError: No estás guardando el .id en el array 'hallazgos' o no usas .push().");
       return;
    }

    // 6. Validar Log
    if (!/console\.log\(\s*hallazgos\s*\)/.test(codigoRaw)) {
       this.logError(" OutputError: Falta mostrar el resultado final con console.log(hallazgos).");
       return;
    }

    this.simularEjecucionExitosa();
  }

  simularEjecucionExitosa() {
    this.mensajeSistema = "SINTAXIS CORRECTA. INICIANDO ESCANEO...";
    this.procesando = true;
    let index = 0;
    const intervalo = setInterval(() => {
      this.targetsVisuales.forEach(t => t.scanning = false);
      if (index < this.targetsVisuales.length) {
        this.targetsVisuales[index].scanning = true;
        this.consolaLogs.push({mensaje: `Escaneando ID: ${this.targetsVisuales[index].id}...`, tipo: 'info'});
        index++;
      } else {
        clearInterval(intervalo);
        this.procesando = false;
        this.finalizarNivel();
      }
    }, 1000);
  }

  finalizarNivel() {
    this.nivelCompletado = true;
    this.mensajeSistema = "¡OBJETIVO LOCALIZADO!";
    this.consolaLogs.push({ mensaje: "-----------------------", tipo: 'info' });
    this.consolaLogs.push({ mensaje: "> [ 'L-FR' ]", tipo: 'success' });
    this.consolaLogs.push({ mensaje: "-----------------------", tipo: 'info' });
    this.consolaLogs.push({ mensaje: "✅ EJECUCIÓN EXITOSA. CÓDIGO LIMPIO.", tipo: 'success' });

    this.auth.completarNivel('nivel16', 'logica', 3000); 
  }

  // 👇 Función para activar la animación final
  activarFinal() {
    this.mostrarVictoria = true;
    // Espera 8 segundos (8000 ms) y vuelve al menú
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 8000);
  }

  logError(msg: string) {
    this.consolaLogs.push({ mensaje: msg, tipo: 'error' });
    this.mensajeSistema = "FALLO DE COMPILACIÓN";
  }
}