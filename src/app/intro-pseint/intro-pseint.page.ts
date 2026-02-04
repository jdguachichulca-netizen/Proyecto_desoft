import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
// 👇 1. IMPORTAMOS LO NECESARIO PARA ICONOS
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { hardwareChip } from 'ionicons/icons';

@Component({
  selector: 'app-intro-pseint',
  templateUrl: './intro-pseint.page.html',
  styleUrls: ['./intro-pseint.page.scss'],
  standalone: true,
  // 👇 2. AGREGAMOS IonIcon AQUI
  imports: [IonContent, CommonModule, FormsModule, IonIcon]
})
export class IntroPseintPage implements OnInit {

  constructor(private router: Router) { 
    // 👇 3. REGISTRAMOS EL ICONO DEL CHIP
    addIcons({ hardwareChip });
  }

  ngOnInit() {
  }

  irAlNivel1() {
    this.router.navigate(['/nivel1']); 
  }

}