import { Injectable, signal } from '@angular/core';

export interface Estadisticas {
  logica: number;
  sintaxis: number;
  depuracion: number;
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

  constructor() { 
    // Al iniciar, intentamos cargar (pero no borramos nada si falla)
    this.cargarDatos();
  }

  // --- 1. GESTIÓN DE SESIÓN ---

  // Crea una partida nueva y la guarda INMEDIATAMENTE
  crearNuevaPartida(nombre: string, avatar: string = '') {
    console.log('✨ CREANDO NUEVA PARTIDA:', nombre);
    this.currentUser.set(nombre);
    if (avatar) this.currentAvatar.set(avatar);
    
    // Reseteamos valores
    this.currentLevel.set(1);
    this.currentXP.set(0);
    this.userStats.set({ logica: 0, sintaxis: 0, depuracion: 0, nivelesCompletados: [] });
    
    // 💾 GUARDADO FORZOSO
    this.guardarDatos();
  }

  // Restaura una sesión existente sin borrar nada
  recuperarSesion(datos: any) {
    console.log(' RECUPERANDO SESIÓN:', datos.user);
    this.currentUser.set(datos.user);
    this.currentLevel.set(datos.level || 1);
    this.currentXP.set(datos.xp || 0);
    this.currentAvatar.set(datos.avatar || 'assets/avatars/default.png');
    if (datos.stats) this.userStats.set(datos.stats);
    
    // Refrescamos el guardado
    this.guardarDatos();
  }

  // --- 2. LOGOUT SEGURO (AQUÍ ESTABA EL PELIGRO) ---
  logout() {
    console.log('🔒 CERRANDO SESIÓN (RAM)...');
    
    // 1. Limpiamos SOLO la memoria RAM
    this.currentUser.set(null);
    this.currentLevel.set(1);
    this.currentXP.set(0);
    
    // ⚠️ IMPORTANTE: VERIFICAMOS QUE LOS DATOS SIGAN EN EL DISCO
    const datosDisco = localStorage.getItem(this.STORAGE_KEY);
    if (datosDisco) {
      console.log(' CONFIRMADO: Los datos siguen seguros en el disco.');
    } else {
      console.error(' ALERTA: ¡No hay datos en el disco! Algo los borró.');
    }
  }

  // Borrado manual (Solo si el usuario lo pide explícitamente)
  borrarPartida() {
    console.warn('🗑️ BORRANDO PARTIDA DEL DISCO...');
    localStorage.removeItem(this.STORAGE_KEY);
    this.logout();
  }

  // --- 3. UTILIDADES ---
  
  // Esta función es la que usa el Registro para ver si hay datos
  getLastSession(): any | null {
    const guardado = localStorage.getItem(this.STORAGE_KEY);
    console.log('📂 Consultando disco...', guardado ? 'DATOS ENCONTRADOS' : 'VACÍO');
    return guardado ? JSON.parse(guardado) : null;
  }

  isAuthenticated(): boolean { return this.currentUser() !== null; }
  isLoggedIn(): boolean { return this.isAuthenticated(); }

  // --- 4. JUEGO Y PROGRESO ---

  completarNivel(idNivel: string, tipoHabilidad: 'logica'|'sintaxis'|'depuracion', xpGanada: number) {
    const stats = this.userStats();
    if (stats.nivelesCompletados.includes(idNivel)) return;

    this.currentXP.update(xp => xp + xpGanada);
    
    let nuevaHabilidad = stats[tipoHabilidad] + 15;
    if (nuevaHabilidad > 100) nuevaHabilidad = 100;

    const nuevasStats = {
      ...stats,
      [tipoHabilidad]: nuevaHabilidad,
      nivelesCompletados: [...stats.nivelesCompletados, idNivel]
    };
    this.userStats.set(nuevasStats);

    const numeroNivelCompletado = parseInt(idNivel.replace('nivel', ''));
    if (numeroNivelCompletado === this.currentLevel()) {
      this.currentLevel.update(l => l + 1);
    }
    
    // 💾 GUARDADO AUTOMÁTICO
    this.guardarDatos();
  }

  updateAvatar(avatarUrl: string) {
    this.currentAvatar.set(avatarUrl);
    this.guardarDatos();
  }

  // --- 5. PERSISTENCIA (EL MOTOR) ---

  private guardarDatos() {
    // Solo guardamos si hay un usuario válido
    if (this.currentUser()) {
      const estado = {
        user: this.currentUser(),
        avatar: this.currentAvatar(),
        level: this.currentLevel(),
        xp: this.currentXP(),
        stats: this.userStats()
      };
      
      const json = JSON.stringify(estado);
      localStorage.setItem(this.STORAGE_KEY, json);
      console.log(' GUARDADO EXITOSO en disco:', this.currentLevel());
    }
  }

  private cargarDatos() {
    const guardado = localStorage.getItem(this.STORAGE_KEY);
    if (guardado) {
      try {
        const datos = JSON.parse(guardado);
        if (datos.user) {
          console.log(' Auto-Carga detectada para:', datos.user);
          // Opcional: Si quieres auto-login descomenta la siguiente línea
          // this.recuperarSesion(datos);
        }
      } catch (e) {
        console.error('Error al cargar datos', e);
      }
    }
  }
}