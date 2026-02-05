import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// 👇 1. AQUÍ AGREGAMOS LOS COMPONENTES QUE FALTABAN
import { IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro-vista.html',
  styleUrls: ['./registro-estilo.scss'],
  standalone: true,
  // 👇 2. Y AQUÍ LOS REGISTRAMOS PARA QUE EL HTML LOS RECONOZCA
  imports: [
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    CommonModule, 
    FormsModule, 
    RouterLink
  ]
})
export class RegistroPage {
  usuario = { nombre: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  registrar() {
    console.log("1. ¡Click recibido!");
    this.authService.login(this.usuario.nombre); 
    
    console.log("2. Intentando navegar a avatar-selector...");
    this.router.navigate(['/avatar-selector']);
  }
}