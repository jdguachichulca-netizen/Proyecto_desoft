import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  // 👇 AQUÍ ESTÁ TU HTML INTEGRADO
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
            <input type="text" class="pixel-input" [(ngModel)]="usuario.nombre" placeholder="Ej. MasterChief">
          </div>

          <div class="input-group">
            <label>Correo Electrónico</label>
            <input type="email" class="pixel-input" [(ngModel)]="usuario.email" placeholder="ejemplo@correo.com">
          </div>

          <div class="input-group">
            <label>Crear Contraseña</label>
            <input type="password" class="pixel-input" [(ngModel)]="usuario.password">
          </div>

          <button class="btn-enter" (click)="registrar()">
            REGISTRARME E INICIAR
          </button>

          <a class="forgot-link" routerLink="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </ion-content>
  `,
  // 👇 AQUÍ ESTÁ TU SCSS INTEGRADO
  styles: [`
    /* FUENTE PIXELADA */
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

    ion-content {
      --background: #1a0b2e; /* Púrpura oscuro */
      font-family: 'VT323', monospace;
    }

    .game-layout {
      display: flex;
      height: 100vh; /* Ocupa toda la altura */
      box-sizing: border-box;
      
      /* 👇 AQUÍ ESTÁ LA SOLUCIÓN DEL CORTE SUPERIOR 👇 */
      padding: 80px 20px 20px 20px; /* 80px arriba para dejar espacio a la barra DESOFT */
      gap: 15px; /* Espacio entre paneles */
      
      @media (max-width: 768px) { 
        flex-direction: column; 
        height: auto; 
        padding-top: 100px !important; /* Más espacio en móviles */
      }
    }

    /* --- PANELES --- */
    .panel {
      background: rgba(45, 20, 60, 0.95);
      border: 2px solid #ffd700;
      border-radius: 8px;
      padding: 15px; /* Menos padding interno para ahorrar espacio */
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
    }

    .left-panel { 
      flex: 1; 
      overflow: hidden; 
      display: flex;
      flex-direction: column;
    }

    .right-panel { 
      flex: 1.4; /* Un poco más ancho el editor */
    }

    /* --- HISTORIA (IZQUIERDA) --- */
    .story-header {
      border-bottom: 1px solid #b8860b;
      margin-bottom: 10px;
      padding-bottom: 5px;
      
      .level-badge {
        background: #ffd700;
        color: #2d143c;
        padding: 2px 6px;
        font-weight: bold;
        border-radius: 3px;
        font-size: 1rem; /* Más pequeño */
      }
      
      h2 { 
        color: #ffd700; 
        margin: 5px 0 0 0; 
        font-size: 2rem; /* Reducido de 2.5rem */
        line-height: 1;
      }
    }

    .scroll-content { 
      overflow-y: auto; 
      padding-right: 5px; 
      flex: 1; /* Ocupa el espacio restante */
    }

    /* Textos más compactos */
    .story-box p { 
      font-size: 1.1rem; /* Reducido de 1.3rem */
      color: #e0d0f0; 
      margin-bottom: 10px;
      line-height: 1.3;
    }

    .theory-box {
      background: rgba(0, 0, 0, 0.3);
      padding: 10px;
      border-radius: 6px;
      border: 1px dashed #b8860b;
      margin: 15px 0;

      h3 { color: #ffa500; margin: 0 0 5px 0; font-size: 1.2rem; }
      h4 { color: #ffd700; margin: 10px 0 2px 0; font-size: 1.1rem; }
      p { font-size: 1rem; margin: 0 0 5px 0; }

      .code-example {
        background: #000;
        color: #00ff00;
        padding: 5px 8px;
        border-left: 3px solid #ffd700;
        font-family: monospace;
        font-size: 0.9rem; /* Código compacto */
      }
    }

    .mission-box {
      background: rgba(255, 215, 0, 0.05);
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #ffd700;
      h3 { margin-top: 0; font-size: 1.2rem; color: #ffd700; }
      li { font-size: 1.1rem; color: #fff; margin-bottom: 4px; }
    }

    /* --- EDITOR (DERECHA) --- */
    .panel-header {
      color: #ffa500;
      font-size: 1.3rem;
      text-align: center;
      margin-bottom: 8px;
      border-bottom: 1px solid #555;
      padding-bottom: 5px;
    }

    .code-editor {
      background: #1e1e1e;
      border: 1px solid #555;
      border-radius: 4px;
      height: 120px; /* Menos altura */
      display: flex;
      margin-bottom: 10px;
      font-family: monospace;

      .line-numbers {
        background: #252526;
        color: #666;
        padding: 5px;
        text-align: right;
        border-right: 1px solid #444;
        span { display: block; height: 20px; font-size: 0.9rem; }
      }

      textarea {
        flex: 1;
        background: transparent;
        color: #d4d4d4;
        border: none;
        padding: 5px 10px;
        resize: none;
        font-family: 'Courier New', monospace;
        font-size: 1rem; /* Letra de código normal */
        line-height: 20px;
        &:focus { outline: none; }
      }
    }

    .btn-compile {
      width: 100%;
      padding: 8px; /* Botón más delgado */
      background: linear-gradient(90deg, #ff8c00, #ff4500);
      color: white;
      font-family: 'VT323', monospace;
      font-size: 1.3rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 3px 0 #8b0000;
      
      &:active { transform: translateY(3px); box-shadow: none; }
      &:disabled { background: #555; box-shadow: none; cursor: not-allowed; }
    }

    /* --- VISUALIZADOR --- */
    .visualizer-arena {
      margin-top: 10px;
      background: #2a1010;
      border: 2px solid #8b4513;
      border-radius: 6px;
      padding: 10px;
      flex: 1; /* Ocupa el resto del espacio vertical */
      display: flex;
      flex-direction: column;
      justify-content: center; /* Centra al gladiador verticalmente */
      align-items: center;
      position: relative;
      
      /* Patrón de suelo más sutil */
      background-image: radial-gradient(#3e1616 10%, transparent 10%);
      background-size: 15px 15px;
    }

    .gladiator {
      position: relative;
      margin-bottom: 10px;
      
      .hero-img {
        height: 80px; /* Gladiador más pequeño para que quepa bien */
        filter: drop-shadow(0 4px 4px rgba(0,0,0,0.5));
      }

      .weapon-slot {
        position: absolute;
        top: 15px;
        right: -30px;
        font-size: 2.5rem;
        opacity: 0;
        transition: all 0.5s ease;
        
        &.has-weapon {
          opacity: 1;
          transform: scale(1.1) rotate(15deg);
          filter: drop-shadow(0 0 8px gold);
        }
      }
    }

    .arena-console {
      width: 100%;
      background: #000;
      border: 1px solid #444;
      height: 80px; /* Consola más bajita */
      padding: 8px;
      overflow-y: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      
      .console-header { color: #666; border-bottom: 1px solid #333; margin-bottom: 4px; font-size: 0.8rem;}
      
      .log-success { color: #00ff00; }
      .log-error { color: #ff4500; }
      .log-info { color: #00bfff; }
    }
  `],
  imports: [IonContent, CommonModule, FormsModule, RouterLink]
})
export class RegistroPage {
  usuario = { nombre: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  registrar() {
    console.log("Registrando usuario:", this.usuario.nombre);
    // 1. Guardamos el usuario (Nombre)
    this.authService.login(this.usuario.nombre); 
    
    console.log("Intentando navegar a avatar-selector...");
    this.router.navigate(['/avatar-selector']);
  }
}