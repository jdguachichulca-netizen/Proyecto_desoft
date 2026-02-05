import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth.service';

// 👇 AQUÍ IMPORTAMOS CADA COMPONENTE QUE USAS EN EL HTML
import { 
  IonApp, 
  IonRouterOutlet, 
  IonHeader,   // Faltaba este
  IonToolbar,  // Faltaba este
  IonButton    // Faltaba este
} from '@ionic/angular/standalone'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterLinkActive,
    // 👇 Y LOS REGISTRAMOS AQUÍ PARA QUE ANGULAR LOS ENTIENDA
    IonApp, 
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonButton
  ],
})
export class AppComponent {
  public auth = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}