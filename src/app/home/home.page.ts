import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, 
  IonButton, IonIcon, IonProgressBar 
} from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, 
    IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonButton, IonIcon, IonProgressBar
  ]
})
export class HomePage implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);

  // Efecto de Terminal
  mensajeTerminal: string = '';
  private mensajeCompleto: string = '';
  
  // Variable para el tip actual
  currentTip: string = "";

  // 👇 BASE DE DATOS DE CONOCIMIENTO (30 TIPS)
  tips = [
    // LÓGICA
    "TIP: Si copias y pegas código 3 veces, haz una función.",
    "TIP: Divide y vencerás: rompe problemas grandes en pequeños.",
    "TIP: Un punto y coma faltante es el ninja más letal del código.",
    "TIP: Indentar el código no es moda, es higiene mental.",
    "TIP: Pon nombres claros. 'variable1' no significa nada.",
    "TIP: Comenta el POR QUÉ, no el QUÉ.",
    "TIP: Los errores rojos en consola son tus amigos, léelos.",
    "TIP: Antes de teclear, diagrama tu solución en papel.",
    "TIP: Git es tu salvavidas. Haz commits frecuentes.",
    "TIP: Primero haz que funcione, luego haz que sea rápido.",
    
    // DEBUGGING
    "TIP: Explícale tu código a un patito de goma (Rubber Ducking).",
    "TIP: console.log() salva vidas, pero bórralo al final.",
    "TIP: Si funcionaba ayer y hoy no, revisa lo último que tocaste.",
    "TIP: A veces el error está en la línea anterior a la que dice el compilador.",
    "TIP: Saber Googlear el error es el 50% del trabajo.",

    // SALUD
    "TIP: Regla 20-20-20: Cada 20 min mira a 6 metros por 20 seg.",
    "TIP: Un programador hidratado resuelve bugs más rápido.",
    "TIP: ¿Bloqueado? Levántate y camina 5 minutos.",
    "TIP: Cuida tu espalda o ella te odiará en 10 años.",
    "TIP: Dormir bien es parte de depurar tu cerebro.",

    // MOTIVACIÓN
    "TIP: Todo senior fue un junior que no se rindió.",
    "TIP: No te compares con otros, compárate con tu yo de ayer.",
    "TIP: El síndrome del impostor es normal. Tú puedes.",
    "TIP: Programar es 10% escribir y 90% pensar.",
    "TIP: Celebra cada pequeña victoria, incluso un 'Hola Mundo'.",

    // TÉCNICOS
    "TIP: Los arrays empiezan en 0. Tatúatelo.",
    "TIP: == compara valor, === compara valor y tipo (JS).",
    "TIP: Mantén tus funciones cortas y enfocadas.",
    "TIP: No uses 'números mágicos', usa constantes.",
    "TIP: La constancia vence al talento. Sigue practicando."
  ];

  ngOnInit() {
    this.iniciarTerminal();
    this.seleccionarTip();
  }

  iniciarTerminal() {
    const user = this.auth.currentUser() || 'RECLUTA';
    // Mensaje estilo militar/futurista
    this.mensajeCompleto = `> SISTEMA DESOFT V1.0\n> IDENTIDAD: ${user.toUpperCase()}\n> NIVEL DE ACCESO: AUTORIZADO\n> ESTADO: LISTO PARA LA MISIÓN.`;
    
    let i = 0;
    this.mensajeTerminal = '';
    const typeWriter = setInterval(() => {
      if (i < this.mensajeCompleto.length) {
        this.mensajeTerminal += this.mensajeCompleto.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, 35);
  }

  seleccionarTip() {
    const random = Math.floor(Math.random() * this.tips.length);
    this.currentTip = this.tips[random];
  }

  irAMisiones() {
    this.router.navigate(['/misiones']);
  }
}