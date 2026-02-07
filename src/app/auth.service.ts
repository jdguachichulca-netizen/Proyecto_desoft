import { Injectable, signal } from '@angular/core';

// Definimos qué habilidades tiene el cadete
export interface Estadisticas {
  logica: number;
  sintaxis: number;
  depuracion: number;
  nivelesCompletados: string[]; // Lista de niveles ganados
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // --- SEÑALES (ESTADO DE LA APP) ---
  currentUser = signal<string | null>(null);
  currentAvatar = signal<string>('');
  
  // SISTEMA DE XP
  currentXP = signal<number>(0); 
  currentLevel = signal<number>(1);

  // 👇 SEÑAL PARA ESTADÍSTICAS (AHORA INICIAN EN 0)
  userStats = signal<Estadisticas>({
    logica: 0,       // Corregido: Empieza en 0%
    sintaxis: 0,     // Corregido: Empieza en 0%
    depuracion: 0,   // Corregido: Empieza en 0%
    nivelesCompletados: []
  });

  constructor() { 
    // RECUPERAR DATOS AL ABRIR LA APP (Persistencia)
    this.cargarDatosGuardados();
  }

  // Función privada para leer del localStorage al inicio
  private cargarDatosGuardados() {
    const savedUser = localStorage.getItem('usuarioLogueado');
    const savedAvatar = localStorage.getItem('avatarLogueado');
    const savedXP = localStorage.getItem('xpLogueado'); 
    // Recuperamos las estadísticas
    const savedStats = localStorage.getItem('statsLogueado');

    if (savedUser) this.currentUser.set(savedUser);
    if (savedAvatar) this.currentAvatar.set(savedAvatar);
    if (savedXP) this.currentXP.set(parseInt(savedXP));
    
    // Si existen stats guardadas, las cargamos en la señal
    if (savedStats) {
      this.userStats.set(JSON.parse(savedStats));
    }
  }

  // LOGIN (GUARDAMOS TODO)
  login(nombre: string, avatar: string = '') {
    this.currentUser.set(nombre);
    if (avatar) this.currentAvatar.set(avatar);

    localStorage.setItem('usuarioLogueado', nombre);
    if (avatar) localStorage.setItem('avatarLogueado', avatar);
  }

  // --- VALIDACIONES DE SESIÓN ---

  isAuthenticated(): boolean {
    return this.currentUser() !== null || localStorage.getItem('usuarioLogueado') !== null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // --- SISTEMA DE XP Y PROGRESO ---

  ganarXP(cantidad: number) {
    this.currentXP.update(valorActual => valorActual + cantidad);
    localStorage.setItem('xpLogueado', this.currentXP().toString());
  }

  // Función para completar niveles y mejorar habilidades
  completarNivel(idNivel: string, tipoHabilidad: 'logica'|'sintaxis'|'depuracion', xpGanada: number) {
    const statsActuales = this.userStats();

    // A. Verificamos si ya pasó este nivel
    if (statsActuales.nivelesCompletados.includes(idNivel)) {
      console.log("Este nivel ya fue completado anteriormente.");
      return; 
    }

    // B. Sumamos XP General
    this.ganarXP(xpGanada);

    // C. Mejoramos la habilidad específica (Tope 100%)
    let nuevoValor = statsActuales[tipoHabilidad] + 15; 
    if (nuevoValor > 100) nuevoValor = 100;

    // D. Actualizamos el objeto de estadísticas
    const nuevasStats = {
      ...statsActuales,
      [tipoHabilidad]: nuevoValor,
      nivelesCompletados: [...statsActuales.nivelesCompletados, idNivel]
    };

    // E. Guardamos en Señal y Memoria
    this.userStats.set(nuevasStats);
    localStorage.setItem('statsLogueado', JSON.stringify(nuevasStats));
  }

  // LOGOUT
  logout() {
    this.currentUser.set(null);
    this.currentAvatar.set('');
    this.currentXP.set(0); 
    
    // 👇 AL SALIR, REINICIAMOS TODO A CERO VISUALMENTE
    this.userStats.set({ logica: 0, sintaxis: 0, depuracion: 0, nivelesCompletados: [] });
    
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('avatarLogueado');
    localStorage.removeItem('xpLogueado');
    localStorage.removeItem('statsLogueado'); 
    localStorage.clear();
  }

  updateAvatar(avatarUrl: string) {
    if (!avatarUrl) return; 
    this.currentAvatar.set(avatarUrl); 
    localStorage.setItem('avatarLogueado', avatarUrl); 
  }
}