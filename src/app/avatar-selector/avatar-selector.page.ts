import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Para navegar
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service'; // Importamos el servicio

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.page.html',
  styleUrls: ['./avatar-selector.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class AvatarSelectorPage {

  constructor(private auth: AuthService, private router: Router) { }

  elegirAvatar(url: string) {
    // 1. Guardamos la imagen seleccionada en el servicio
    this.auth.updateAvatar(url);

    // 2. Ahora sí, ¡a la aventura!
    this.router.navigate(['/misiones']);
  }
}