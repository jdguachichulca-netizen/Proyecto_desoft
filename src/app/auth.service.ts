import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Datos del usuario
  currentUser = signal<string | null>(null);
  currentAvatar = signal<string>('');
  
  // --- NUEVO: SISTEMA DE XP ---
  currentXP = signal<number>(0); // Empieza en 0
  currentLevel = signal<number>(1);

  constructor() { 
    // Recuperar datos al abrir la app
    const savedUser = localStorage.getItem('usuarioLogueado');
    const savedAvatar = localStorage.getItem('avatarLogueado');
    const savedXP = localStorage.getItem('xpLogueado'); // Recuperamos XP

    if (savedUser) this.currentUser.set(savedUser);
    if (savedAvatar) this.currentAvatar.set(savedAvatar);
    if (savedXP) this.currentXP.set(parseInt(savedXP));
  }

  login(nombre: string, avatar: string = '') {
    this.currentUser.set(nombre);
    this.currentAvatar.set(avatar);
    localStorage.setItem('usuarioLogueado', nombre);
    localStorage.setItem('avatarLogueado', avatar);
  }

  // --- FUNCIÓN PARA SUMAR XP ---
  ganarXP(cantidad: number) {
    // 1. Actualizamos la señal sumando el valor
    this.currentXP.update(valorActual => valorActual + cantidad);
    
    // 2. Guardamos en memoria del navegador
    localStorage.setItem('xpLogueado', this.currentXP().toString());
  }

  logout() {
    this.currentUser.set(null);
    this.currentAvatar.set('');
    this.currentXP.set(0); // Reseteamos XP al salir
    localStorage.clear();
  }

  isLoggedIn() {
    return this.currentUser() !== null;
  }

updateAvatar(avatarUrl: string) {
    if (!avatarUrl) return; // Protección contra vacíos

    this.currentAvatar.set(avatarUrl); // Actualiza el círculo al instante
    localStorage.setItem('avatarLogueado', avatarUrl); // Lo guarda para después
  }
}