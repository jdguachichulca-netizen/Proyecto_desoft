import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Importamos Router
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service'; // Importamos el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterLink]
})
export class LoginPage {

  // Inyectamos el servicio de Autenticación y el Router
  constructor(private auth: AuthService, private router: Router) { }

  // ESTA ES LA FUNCIÓN QUE SE EJECUTA AL DAR CLIC
  iniciarSesion() {
    console.log("Intentando iniciar sesión...");
    
    // 1. Avisamos al servicio que el usuario entró (Le ponemos nombre "Cadete")
    this.auth.login('Cadete'); 

    // 2. Navegamos manualmente a misiones
    this.router.navigate(['/misiones']);
  }

}