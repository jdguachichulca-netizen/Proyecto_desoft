import { Injectable, signal } from '@angular/core';

export interface Estadisticas {
  logica: number;
  sintaxis: number;
  depuracion: number;
  objetos?: number; // ✅ Agregamos opcionalmente objetos
  nivelesCompletados: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // --- SEÑALES (ESTADO) ---
  currentUser = signal<string | null>(null);
  currentAvatar = signal<string>('assets/avatars/default.png');
  currentXP = signal<number>(0); 
  currentLevel = signal<number>(1); 

  userStats = signal<Estadisticas>({
    logica: 0, sintaxis: 0, depuracion: 0, nivelesCompletados: []
  });

  // 👇 CLAVE NUEVA Y ÚNICA
  private STORAGE_KEY = 'WBIT_FINAL_V3';

  // ✅ ESTA VARIABLE YA ESTÁ LISTA PARA LA MISIÓN FINAL
  misionFinalDesbloqueada: boolean = false;

  constructor() { 
    this.cargarDatos();
  }

  // --- 1. GESTIÓN DE SESIÓN ---

  crearNuevaPartida(nombre: string, avatar: string = '') {
    console.log('✨ CREANDO NUEVA PARTIDA:', nombre);
    this.currentUser.set(nombre);
    if (avatar) this.currentAvatar.set(avatar);
    
    // Reseteamos valores
    this.currentLevel.set(1);
    this.currentXP.set(0);
    this.userStats.set({ logica: 0, sintaxis: 0, depuracion: 0, nivelesCompletados: [] });
    
    this.guardarDatos();
  }

  recuperarSesion(datos: any) {
    console.log('🔄 RECUPERANDO SESIÓN:', datos.user);
    this.currentUser.set(datos.user);
    this.currentLevel.set(datos.level || 1);
    this.currentXP.set(datos.xp || 0);
    this.currentAvatar.set(datos.avatar || 'assets/avatars/default.png');
    if (datos.stats) this.userStats.set(datos.stats);
    
    // ✅ Recuperar estado de misión final
    if (datos.finalDesbloqueado) {
      this.misionFinalDesbloqueada = true;
    }
    
    this.guardarDatos();
  }

  // --- 2. ZONA DE COMPATIBILIDAD ---
  
  login(nombre: string, avatar: string = '') {
    this.crearNuevaPartida(nombre, avatar);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  // --- 3. LOGOUT SEGURO ---
  logout() {
    console.log('🔒 CERRANDO SESIÓN (RAM)...');
    
    // 1. Limpiamos SOLO la memoria RAM
    this.currentUser.set(null);
    this.currentLevel.set(1);
    this.currentXP.set(0);
  }

  borrarPartida() {
    console.warn('🗑️ BORRANDO PARTIDA DEL DISCO...');
    localStorage.removeItem(this.STORAGE_KEY);
    this.logout();
  }

  // --- 4. UTILIDADES ---
  
  getLastSession(): any | null {
    const guardado = localStorage.getItem(this.STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : null;
  }

  // --- 5. JUEGO Y PROGRESO ---

  // ✅ CORREGIDO: Ahora acepta 'objetos' como tipo válido
  completarNivel(idNivel: string, tipoHabilidad: 'logica'|'sintaxis'|'depuracion'|'objetos', xpGanada: number) {
    const stats = this.userStats();
    if (stats.nivelesCompletados.includes(idNivel)) return;

    this.currentXP.update(xp => xp + xpGanada);
    
    // Si es una habilidad normal, subimos stats. Si son objetos, solo marcamos nivel.
    if (tipoHabilidad !== 'objetos') {
        let nuevaHabilidad = stats[tipoHabilidad] + 15;
        if (nuevaHabilidad > 100) nuevaHabilidad = 100;
    
        const nuevasStats = {
          ...stats,
          [tipoHabilidad]: nuevaHabilidad,
          nivelesCompletados: [...stats.nivelesCompletados, idNivel]
        };
        this.userStats.set(nuevasStats);
    } else {
        const nuevasStats = {
            ...stats,
            nivelesCompletados: [...stats.nivelesCompletados, idNivel]
        };
        this.userStats.set(nuevasStats);
    }

    // Subir de nivel
    const numeroNivelCompletado = parseInt(idNivel.replace('nivel', ''));
    if (numeroNivelCompletado === this.currentLevel()) {
      this.currentLevel.update(l => l + 1);
    }
    
    this.guardarDatos();
  }

  // ✅ ESTA ES LA FUNCIÓN QUE TE FALTABA Y QUE YA TIENES AQUÍ
  desbloquearMisionFinal() {
    this.misionFinalDesbloqueada = true;
    console.log("¡MISIÓN FINAL DESBLOQUEADA! 🔓");
    this.guardarDatos(); 
  }

  // ✅ FUNCIÓN PARA CONSULTAR ESTADO
  esMisionFinalAbierta(): boolean {
    return this.misionFinalDesbloqueada;
  }

  updateAvatar(avatarUrl: string) {
    this.currentAvatar.set(avatarUrl);
    this.guardarDatos();
  }

  // --- 6. PERSISTENCIA ---

  private guardarDatos() {
    if (this.currentUser()) {
      const estado = {
        user: this.currentUser(),
        avatar: this.currentAvatar(),
        level: this.currentLevel(),
        xp: this.currentXP(),
        stats: this.userStats(),
        finalDesbloqueado: this.misionFinalDesbloqueada // ✅ Guardamos esto
      };
      
      const json = JSON.stringify(estado);
      localStorage.setItem(this.STORAGE_KEY, json);
      console.log('💾 GUARDADO EXITOSO');
    }
  }

  private cargarDatos() {
    const guardado = localStorage.getItem(this.STORAGE_KEY);
    if (guardado) {
      try {
        const datos = JSON.parse(guardado);
        if (datos.user) {
          console.log('⚡ Auto-Carga detectada para:', datos.user);
          if(datos.finalDesbloqueado) {
             this.misionFinalDesbloqueada = true;
          }
        }
      } catch (e) {
        console.error('Error al cargar datos', e);
      }
    }
  }
}