import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service'; // <--- Crearemos esto en el siguiente paso

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterLink]
})
export class RegistroPage {
  usuario = { nombre: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  registrar() {
    console.log("1. ¡Click recibido!");
    // 1. Guardamos el usuario (Nombre)
    // Nota: Aún no guardamos el avatar porque lo va a elegir ahora
    this.authService.login(this.usuario.nombre); 
    
   console.log("2. Intentando navegar a avatar-selector..."); // <--- AGREGA ESTO
    this.router.navigate(['/avatar-selector']);
  }
  }
