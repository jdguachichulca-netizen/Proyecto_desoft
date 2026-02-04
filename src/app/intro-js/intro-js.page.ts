import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
// Importamos los iconos necesarios
import { logoJavascript, lockOpen } from 'ionicons/icons';

@Component({
  selector: 'app-intro-js',
  templateUrl: './intro-js.page.html',
  styleUrls: ['./intro-js.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon]
})
export class IntroJsPage implements OnInit {

  constructor(private router: Router) { 
    addIcons({ logoJavascript, lockOpen });
  }

  ngOnInit() { }

  irAlNivel9() {
    // Redirige al primer nivel de JS
    this.router.navigate(['/nivel9']); 
  }
}