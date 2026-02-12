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
  // ❌ BORRAMOS 'templateUrl' PARA EVITAR EL ERROR
  // Usamos solo 'template' para tener el HTML aquí mismo:
  template: `
    <ion-content>
      <div class="container">
        
        <div class="card" *ngIf="partidaGuardada">
          <h1>¡HOLA DE NUEVO!</h1>
          
          <img [src]="partidaGuardada.avatar || 'assets/avatars/default.png'" class="avatar-preview">
          <h2>{{ partidaGuardada.user }}</h2>
          <p>NIVEL {{ partidaGuardada.level }} • {{ partidaGuardada.xp }} XP</p>

          <button class="btn-main" (click)="continuar()">
            <ion-icon name="play"></ion-icon> CONTINUAR AVENTURA
          </button>

          <button class="btn-danger" (click)="borrar()">
            <ion-icon name="trash"></ion-icon> BORRAR Y EMPEZAR DE CERO
          </button>
        </div>

        <div class="card" *ngIf="!partidaGuardada">
          <h1>NUEVO RECLUTA</h1>
          <p>Identifícate para ingresar al sistema.</p>

          <input type="text" [(ngModel)]="nuevoNombre" placeholder="Tu nombre...">

          <button class="btn-main" (click)="registrar()">
            <ion-icon name="person-add"></ion-icon> CREAR CUENTA
          </button>
        </div>

      </div>
    </ion-content>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
    ion-content { --background: linear-gradient(135deg, #130722 0%, #2a103e 100%); font-family: 'VT323', monospace; }
    .container { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    
    .card {
      background: rgba(30, 25, 45, 0.9); border: 1px solid #8a2be2;
      border-radius: 16px; padding: 30px; width: 100%; max-width: 400px;
      text-align: center; box-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
    }
    
    h1 { color: #fff; font-size: 2.5rem; margin-bottom: 10px; }
    h2 { color: #4ade80; margin: 0; font-size: 1.5rem; }
    p { color: #ccc; font-size: 1.2rem; }

    /* Estilos Continuar */
    .avatar-preview { width: 80px; height: 80px; border-radius: 50%; border: 3px solid #4ade80; margin: 20px auto; display: block; object-fit: cover; }
    
    .btn-main {
      width: 100%; background: #4ade80; color: #000; padding: 15px;
      font-size: 1.5rem; font-weight: bold; border-radius: 8px; border: none;
      font-family: 'VT323'; cursor: pointer; margin-top: 20px;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      transition: transform 0.2s;
    }
    .btn-main:hover { transform: scale(1.02); }
    
    .btn-danger {
      background: transparent; color: #ff4d4d; border: 1px solid #ff4d4d;
      margin-top: 15px; font-size: 1rem; padding: 10px; width: 100%; cursor: pointer;
      font-family: 'VT323'; display: flex; align-items: center; justify-content: center; gap: 5px;
    }

    /* Inputs */
    input { 
      width: 100%; padding: 12px; margin-top: 10px; background: rgba(0,0,0,0.3);
      border: 1px solid #666; color: #fff; font-family: 'VT323'; font-size: 1.3rem;
      border-radius: 4px;
    }
  `],
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class RegistroPage {
  auth = inject(AuthService);
  router = inject(Router);
  
  partidaGuardada: any = null;
  nuevoNombre: string = '';

  constructor() {
    addIcons({ play, trash, personAdd });
  }

  ionViewWillEnter() {
    // 1. Verificamos si ya hay alguien logueado en memoria (RAM)
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/misiones']);
      return;
    }

    // 2. Buscamos en el DISCO DURO (LocalStorage)
    // NOTA: Asegúrate de haber actualizado el AuthService con el código del paso anterior
    const datosDisco = this.auth.getLastSession();
    
    if (datosDisco && datosDisco.user) {
      console.log("Partida encontrada en disco:", datosDisco);
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
    if (!this.nuevoNombre.trim()) return;
    this.auth.crearNuevaPartida(this.nuevoNombre);
    this.router.navigate(['/avatar-selector']);
  }

  borrar() {
    if (confirm('¿Estás seguro? Se borrará todo tu progreso para siempre.')) {
      this.auth.borrarPartida();
      this.partidaGuardada = null; 
      this.nuevoNombre = '';
    }
  }
}