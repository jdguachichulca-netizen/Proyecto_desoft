import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { cubeOutline, hardwareChipOutline, mapOutline } from 'ionicons/icons';

@Component({
  selector: 'app-nivel14',
  templateUrl: './nivel14.page.html',
  styleUrls: ['./nivel14.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Nivel14Page {

  private auth = inject(AuthService);
  private router = inject(Router);

  textoBase: string = `// Crea una lista con: "Bateria", "Chip", "Mapa"
// Recuerda usar corchetes [] y comas ,

`;

  codigoUsuario: string = this.textoBase;
  consolaLogs: { mensaje: string, tipo: string }[] = [];
  mensajeSistema: string = '';
  nivelCompletado: boolean = false;
  
  itemsCargados: string[] = [];

  constructor() {
    addIcons({ cubeOutline, hardwareChipOutline, mapOutline });
  }

  limpiarTerminal() {
    if (this.codigoUsuario === this.textoBase) {
      this.codigoUsuario = '';
    }
  }

  ejecutarCodigo() {
    this.consolaLogs = [];
    this.itemsCargados = []; 
    this.mensajeSistema = "VERIFICANDO SINTAXIS...";

    const codigo = this.codigoUsuario.trim();

    // 1. VALIDACIÓN: Variable
    if (!codigo.includes('let suministros') && !codigo.includes('const suministros')) {
      this.logError(" Error: Debes crear la variable 'suministros'.");
      return;
    }

    // 2. VALIDACIÓN: Corchetes
    if (!codigo.includes('[') || !codigo.includes(']')) {
      this.logError(" Error de Sintaxis: Un Array debe estar encerrado entre corchetes [ ].");
      return;
    }

    // 3. VALIDACIÓN: Contenido (Estricto con mayúsculas como pediste)
    const tieneBateria = codigo.includes('"Bateria"') || codigo.includes("'Bateria'");
    const tieneChip = codigo.includes('"Chip"') || codigo.includes("'Chip'");
    const tieneMapa = codigo.includes('"Mapa"') || codigo.includes("'Mapa'");

    if (!tieneBateria || !tieneChip || !tieneMapa) {
      this.logError(" Error: Faltan elementos o están mal escritos (Revisa mayúsculas).");
      return;
    }

    // 4. VALIDACIÓN: Comas
    const contenidoArray = codigo.substring(codigo.indexOf('[') + 1, codigo.indexOf(']'));
    const numeroComas = (contenidoArray.match(/,/g) || []).length;

    if (numeroComas < 2) {
      this.logError(" Error de Sintaxis: Debes separar CADA elemento con una coma (,).");
      return;
    }

    this.simularCarga();
  }

  simularCarga() {
    this.consolaLogs.push({ mensaje: "Sintaxis de Array válida.", tipo: 'info' });
    this.consolaLogs.push({ mensaje: "Iniciando secuencia de carga...", tipo: 'info' });
    
    // Animación didáctica: Muestra el índice [0], [1], [2]
    setTimeout(() => {
      this.itemsCargados.push("Bateria");
      this.consolaLogs.push({ mensaje: "> Guardando en índice [0]: \"Bateria\"", tipo: 'success' });
    }, 600);

    setTimeout(() => {
      this.itemsCargados.push("Chip");
      this.consolaLogs.push({ mensaje: "> Guardando en índice [1]: \"Chip\"", tipo: 'success' });
    }, 1400);

    setTimeout(() => {
      this.itemsCargados.push("Mapa");
      this.consolaLogs.push({ mensaje: "> Guardando en índice [2]: \"Mapa\"", tipo: 'success' });
      this.finalizarNivel();
    }, 2200);
  }

  finalizarNivel() {
    this.mensajeSistema = "INVENTARIO AL 100%";
    this.consolaLogs.push({ mensaje: "LISTA CARGADA CORRECTAMENTE.", tipo: 'success' });
    this.nivelCompletado = true;
  }

  logError(msg: string) {
    this.consolaLogs.push({ mensaje: msg, tipo: 'error' });
    this.mensajeSistema = "ERROR DE SINTAXIS";
  }

  guardarProgreso() {
    // CORREGIDO: Usamos 'sintaxis' en lugar de 'arrays' para evitar el error
    this.auth.completarNivel('nivel14', 'sintaxis', 450);
    this.router.navigate(['/nivel15']);
  }
}