import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { play, trash, personAdd } from 'ionicons/icons';

@Component({
  selector: 'app-registro',
  standalone: true,
  template: `
    <ion-content>
      <div class="login-wrapper">
        
        <div class="header-text">
          <h1>NUEVO RECLUTA</h1>
          <h2>CREA TU CUENTA</h2>
        </div>

        <div class="login-card found-card" *ngIf="partidaGuardada">
          <h3>¡PARTIDA ENCONTRADA!</h3>
          
          <div class="user-preview">
             <img [src]="partidaGuardada.avatar || 'assets/avatars/default.png'">
             <div>
                <span class="u-name">{{ partidaGuardada.user }}</span>
                <span class="u-level">NIVEL {{ partidaGuardada.level }}</span>
             </div>
          </div>

          <button class="btn-neon" (click)="continuar()">
            <ion-icon name="play"></ion-icon> CONTINUAR
          </button>

          <button class="btn-danger" (click)="borrar()">
            <ion-icon name="trash"></ion-icon> BORRAR Y EMPEZAR DE CERO
          </button>
        </div>

        <div class="login-card" *ngIf="!partidaGuardada">
          
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
            <input type="password" class="modern-input" [(ngModel)]="usuario.password" placeholder="••••••">
          </div>

          <button class="btn-neon" (click)="registrar()">
            REGISTRARME E INICIAR
          </button>

          <p class="forgot-link">¿Ya tienes cuenta? Inicia sesión</p>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

    ion-content {
      --background: linear-gradient(135deg, #130722 0%, #2a103e 100%);
      font-family: 'VT323', monospace;
    }

    .login-wrapper {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: 100vh; padding: 20px; padding-top: 40px;
    }

    /* HEADER TEXT */
    .header-text { text-align: center; margin-bottom: 25px; }
    .header-text h1 { color: #fff; font-size: 2.8rem; margin: 0; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
    .header-text h2 { color: #ccc; font-size: 1.2rem; margin-top: 5px; letter-spacing: 1px; }

    /* CARD STYLES */
    .login-card {
      background: rgba(30, 25, 45, 0.7);
      border: 1px solid rgba(138, 43, 226, 0.3);
      border-radius: 16px; padding: 30px; width: 100%; max-width: 420px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5); backdrop-filter: blur(10px);
    }

    /* INPUTS (Restaurados al estilo original) */
    .input-group { margin-bottom: 20px; }
    .input-group label { display: block; color: #e0e0e0; font-size: 1.1rem; margin-bottom: 8px; font-weight: bold; }
    
    .modern-input {
      width: 100%; background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px; padding: 12px 15px; color: #fff;
      font-family: 'VT323'; font-size: 1.3rem; outline: none; transition: 0.3s;
    }
    .modern-input:focus { border-color: #8a2be2; background: rgba(255, 255, 255, 0.12); }

    /* BOTONES */
    .btn-neon {
      width: 100%; background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
      color: #000; border: none; border-radius: 8px; padding: 14px;
      font-family: 'VT323'; font-size: 1.5rem; font-weight: bold; cursor: pointer;
      box-shadow: 0 0 15px rgba(74, 222, 128, 0.4); margin-top: 10px;
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .btn-neon:hover { transform: translateY(-2px); box-shadow: 0 0 25px rgba(74, 222, 128, 0.6); }

    .btn-danger {
      background: transparent; color: #ff4d4d; border: 1px solid #ff4d4d;
      margin-top: 15px; font-size: 1rem; padding: 10px; width: 100%; cursor: pointer;
      font-family: 'VT323'; display: flex; align-items: center; justify-content: center; gap: 5px;
    }

    .forgot-link { color: #4ade80; text-align: center; margin-top: 20px; text-decoration: underline; cursor: pointer; }

    /* ESTILOS ESPECÍFICOS PARA LA TARJETA DE "ENCONTRADO" */
    .found-card { text-align: center; border: 2px solid #4ade80; }
    .found-card h3 { color: #4ade80; margin-top: 0; font-size: 2rem; }
    .user-preview {
      display: flex; align-items: center; justify-content: center; gap: 15px;
      background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; margin: 20px 0;
    }
    .user-preview img { width: 60px; height: 60px; border-radius: 50%; border: 2px solid #fff; }
    .user-preview div { display: flex; flex-direction: column; text-align: left; }
    .u-name { color: #fff; font-size: 1.5rem; font-weight: bold; }
    .u-level { color: #aaa; }
  `],
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class RegistroPage {
  auth = inject(AuthService);
  router = inject(Router);
  
  partidaGuardada: any = null;
  
  // Recuperamos el objeto completo usuario
  usuario = { nombre: '', email: '', password: '' };

  constructor() {
    addIcons({ play, trash, personAdd });
  }

  ionViewWillEnter() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/misiones']);
      return;
    }

    const datosDisco = this.auth.getLastSession();
    if (datosDisco && datosDisco.user) {
      this.partidaGuardada = datosDisco;
    } else {
      this.partidaGuardada = null;
    }
  }

  continuar() {
    this.auth.recuperarSesion(this.partidaGuardada);
    this.router.navigate(['/misiones']);
  }

  registrar() {
    // Validamos que haya nombre
    if (!this.usuario.nombre.trim()) {
      alert("Por favor, ingresa tu nombre de recluta.");
      return;
    }
    
    // Aquí puedes añadir validación de email/password si quieres en el futuro.
    // Por ahora, usamos el nombre para crear la partida en el motor V3.
    this.auth.crearNuevaPartida(this.usuario.nombre);
    this.router.navigate(['/avatar-selector']);
  }

  borrar() {
    if (confirm('¿Estás seguro? Se borrará todo tu progreso para siempre.')) {
      this.auth.borrarPartida();
      this.partidaGuardada = null; 
      this.usuario = { nombre: '', email: '', password: '' };
    }
  }
}