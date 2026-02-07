// src/app/landing/landing.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // 👈 Importante para los botones
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html', // Apunta a tu HTML del chico saltando
  styleUrls: ['./landing.page.scss'], // Apunta a tu CSS actual
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LandingPage {
  constructor() { }
}