import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonContent, IonGrid, IonRow, IonCol, IonButton, 
  IonHeader, IonToolbar, IonTitle 
} from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.page.html',
  styleUrls: ['./avatar-selector.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonContent, IonGrid, IonRow, IonCol, IonButton, 
    IonHeader, IonToolbar, IonTitle
  ]
})
export class AvatarSelectorPage {
  
  private auth = inject(AuthService);
  private router = inject(Router);

  // 👇 LISTA DE AVATARES (Necesaria para el HTML)
  avatares: string[] = [
    'assets/avatars/avatar-1.png', 
    'assets/avatars/avatar-2.png', 
    'assets/avatars/avatar-3.png', 
    'assets/avatars/avatar-4.png', 
    'assets/avatars/avatar-5.png', 
    'assets/avatars/avatar-6.png'  
  ];

  avatarSeleccionado: string = '';

  constructor() {}

  seleccionar(avatarUrl: string) {
    this.avatarSeleccionado = avatarUrl;
    
    // 1. Guardamos la imagen seleccionada en el servicio
    this.auth.updateAvatar(avatarUrl);

    // 2. Pequeña pausa para ver el efecto de selección y navegar
    setTimeout(() => {
      // Vamos al HOME (Dashboard) para ver el avatar en la barra superior
      this.router.navigate(['/home']);
    }, 300);
  }
}