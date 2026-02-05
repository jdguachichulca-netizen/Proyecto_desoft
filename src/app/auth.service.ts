import { Injectable, signal } from '@angular/core';

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

  constructor() { 
    // 1. RECUPERAR DATOS AL ABRIR LA APP (Persistencia)
    this.cargarDatosGuardados();
  }

  // Función privada para leer del localStorage al inicio
  private cargarDatosGuardados() {
    const savedUser = localStorage.getItem('usuarioLogueado');
    const savedAvatar = localStorage.getItem('avatarLogueado');
    const savedXP = localStorage.getItem('xpLogueado'); 

    if (savedUser) this.currentUser.set(savedUser);
    if (savedAvatar) this.currentAvatar.set(savedAvatar);
    if (savedXP) this.currentXP.set(parseInt(savedXP));
  }

  // 2. LOGIN (GUARDAMOS TODO)
  login(nombre: string, avatar: string = '') {
    // Actualizamos las señales
    this.currentUser.set(nombre);
    if (avatar) this.currentAvatar.set(avatar);

    // Guardamos en el navegador
    localStorage.setItem('usuarioLogueado', nombre);
    if (avatar) localStorage.setItem('avatarLogueado', avatar);
  }

  // --- VALIDACIONES DE SESIÓN ---

  // Opción A: La que usa tu Registro
  isAuthenticated(): boolean {
    return this.currentUser() !== null || localStorage.getItem('usuarioLogueado') !== null;
  }

  // 👇 Opción B: ¡ESTA ES LA QUE FALTABA! (La que usa tu HTML)
  // Simplemente llama a la otra para que ambas funcionen igual.
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // --- SISTEMA DE XP ---
  ganarXP(cantidad: number) {
    this.currentXP.update(valorActual => valorActual + cantidad);
    localStorage.setItem('xpLogueado', this.currentXP().toString());
  }

  // LOGOUT
  logout() {
    this.currentUser.set(null);
    this.currentAvatar.set('');
    this.currentXP.set(0); 
    
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('avatarLogueado');
    localStorage.removeItem('xpLogueado');
  }

  updateAvatar(avatarUrl: string) {
    if (!avatarUrl) return; 
    this.currentAvatar.set(avatarUrl); 
    localStorage.setItem('avatarLogueado', avatarUrl); 
  }
}