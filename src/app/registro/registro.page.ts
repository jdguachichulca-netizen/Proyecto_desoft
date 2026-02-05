import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  
  // 👇 HTML (ESTRUCTURA LIMPIA NEON TECH)
  template: `
    <ion-content>
      <div class="login-wrapper">
        
        <div class="header-text">
          <h1>NUEVO RECLUTA</h1>
          <h2>CREA TU CUENTA</h2>
        </div>

        <div class="login-card">
          
          <div class="input-group">
            <label>Nombre de Usuario</label>
            <input type="text" class="modern-input" [(ngModel)]="usuario.nombre" placeholder="Ej. MasterChief">
          </div>

          <div class="input-group">
            <label>Correo Electrónico</label>
            <input type="email" class="modern-input" [(ngModel)]="usuario.email" placeholder="ejemplo@correo.com">
          </div>

          <div class="input-group">
            <label>Crear Contraseña</label>
            <input type="password" class="modern-input" [(ngModel)]="usuario.password">
          </div>

          <button class="btn-neon" (click)="registrar()">
            REGISTRARME E INICIAR
          </button>

          <a class="forgot-link" routerLink="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>

      </div>
    </ion-content>
  `,

  // 👇 CSS (ESTILO EXACTO NEON TECH)
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

    ion-content {
      --background: #1a0b2e; /* Fondo Morado Oscuro base */
      --background: linear-gradient(135deg, #130722 0%, #2a103e 100%);
      font-family: 'VT323', monospace;
    }

    .login-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      padding-top: 60px;
    }

    /* TEXTOS HEADER */
    .header-text {
      text-align: center;
      margin-bottom: 25px;
    }

    .header-text h1 {
      color: #fff;
      font-size: 2.8rem;
      margin: 0;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .header-text h2 {
      color: #ccc;
      font-size: 1.2rem;
      margin-top: 5px;
      font-weight: normal;
      letter-spacing: 1px;
    }

    /* TARJETA PRINCIPAL */
    .login-card {
      background: rgba(30, 25, 45, 0.7); /* Fondo oscuro semitransparente */
      border: 1px solid rgba(138, 43, 226, 0.3); /* Borde morado muy sutil */
      border-radius: 16px; /* Bordes redondeados */
      padding: 30px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); /* Sombra suave */
      backdrop-filter: blur(10px); /* Efecto cristal */
    }

    /* INPUTS */
    .input-group {
      margin-bottom: 20px;
    }

    .input-group label {
      display: block;
      color: #e0e0e0;
      font-size: 1.1rem;
      margin-bottom: 8px;
      font-weight: bold;
      letter-spacing: 0.5px;
    }

    .modern-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.08); /* Fondo grisaseo/transparente */
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px; /* Bordes redondeados inputs */
      padding: 12px 15px;
      color: #fff;
      font-family: 'VT323', monospace; /* Mantenemos fuente del juego */
      font-size: 1.3rem; /* Letra un poco más grande */
      outline: none;
      box-sizing: border-box;
      transition: all 0.3s ease;
    }

    .modern-input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .modern-input:focus {
      background: rgba(255, 255, 255, 0.12);
      border-color: #8a2be2; /* Borde morado al enfocar */
      box-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
    }

    /* BOTÓN VERDE NEÓN */
    .btn-neon {
      width: 100%;
      background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%); /* Degradado verde */
      color: #000; /* Texto negro */
      border: none;
      border-radius: 8px; /* Bordes redondeados */
      padding: 14px;
      font-family: 'VT323', monospace;
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      margin-top: 15px;
      box-shadow: 0 0 15px rgba(74, 222, 128, 0.4); /* Resplandor verde */
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-neon:hover {
      box-shadow: 0 0 25px rgba(74, 222, 128, 0.6); /* Más brillo al pasar el mouse */
      transform: translateY(-1px);
    }

    .btn-neon:active {
      transform: translateY(1px);
      box-shadow: 0 0 5px rgba(74, 222, 128, 0.4);
    }

    /* LINKS */
    .forgot-link {
      display: block;
      text-align: center;
      margin-top: 20px;
      color: #4ade80; /* Texto verde */
      text-decoration: underline;
      font-size: 1.1rem;
      cursor: pointer;
    }

    .forgot-link:hover {
      color: #fff;
      text-shadow: 0 0 5px #4ade80;
    }
  `],

  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, 
    IonInput, IonButton, 
    CommonModule, FormsModule, RouterLink
  ]
})
export class RegistroPage {
  usuario = { nombre: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  // 👇 ESTO ES LO NUEVO: Detectar si ya entró antes
  ionViewWillEnter() {
    // Si el servicio dice "True" (ya existen datos guardados), saltamos
    if (this.authService.isAuthenticated()) {
      console.log("¡Usuario detectado! Saltando registro...");
      this.router.navigate(['/avatar-selector']);
    }
  }

  registrar() {
    // 1. Validación simple para no guardar nombres vacíos
    if (this.usuario.nombre.trim() === '') {
      alert("¡Recluta! Debes ingresar un nombre.");
      return;
    }

    console.log("Registrando y GUARDANDO usuario:", this.usuario.nombre);
    
    // 2. Llamamos al servicio (que ahora guarda en localStorage)
    this.authService.login(this.usuario.nombre); 
    
    // 3. Navegamos
    this.router.navigate(['/avatar-selector']);
  }
}