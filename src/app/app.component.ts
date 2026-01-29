import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // Importamos Router
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  // Importamos lo necesario para que el HTML no se queje
  imports: [IonApp, IonRouterOutlet, IonHeader, IonToolbar, CommonModule, RouterLink], 
})
export class AppComponent {
  
  // Inyectamos el servicio de autenticación y el router
  auth = inject(AuthService);
  private router = inject(Router); 

  constructor() {}

  // Esta función: 1. Borra datos, 2. Te manda al inicio
  cerrarSesion() {
    this.auth.logout(); 
    this.router.navigate(['/home']);
  }
}