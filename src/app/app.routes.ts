import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing', // 👈 AHORA SÍ: Arranca en la página de presentación (Landing)
    pathMatch: 'full',
  },
  {
    path: 'landing', // 👈 Tu página bonita del chico saltando
    loadComponent: () => import('./landing/landing.page').then( m => m.LandingPage)
  },
  {
    path: 'home', // El Dashboard Futurista (Terminal y Tips)
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'misiones',
    loadComponent: () => import('./misiones/misiones.page').then( m => m.MisionesPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'avatar-selector',
    loadComponent: () => import('./avatar-selector/avatar-selector.page').then( m => m.AvatarSelectorPage)
  },
  {
    path: 'nivel1',
    loadComponent: () => import('./nivel1/nivel1.page').then( m => m.Nivel1Page)
  },
  {
    path: 'nivel2',
    loadComponent: () => import('./nivel2/nivel2.page').then( m => m.Nivel2Page)
  },
  {
    path: 'nivel3',
    loadComponent: () => import('./nivel3/nivel3.page').then( m => m.Nivel3Page)
  },
  {
    path: 'nivel4',
    loadComponent: () => import('./nivel4/nivel4.page').then( m => m.Nivel4Page)
  },
  {
    path: 'nivel5',
    loadComponent: () => import('./nivel5/nivel5.page').then( m => m.Nivel5Page)
  },
  {
    path: 'nivel6',
    loadComponent: () => import('./nivel6/nivel6.page').then( m => m.Nivel6Page)
  },
  {
    path: 'nivel7',
    loadComponent: () => import('./nivel7/nivel7.page').then( m => m.Nivel7Page)
  },
  {
    path: 'nivel8',
    loadComponent: () => import('./nivel8/nivel8.page').then( m => m.Nivel8Page)
  },
  {
    path: 'nivel9',
    loadComponent: () => import('./nivel9/nivel9.page').then( m => m.Nivel9Page)
  },
  {
    path: 'intro-pseint',
    loadComponent: () => import('./intro-pseint/intro-pseint.page').then( m => m.IntroPseintPage)
  },
  {
    path: 'intro-js',
    loadComponent: () => import('./intro-js/intro-js.page').then( m => m.IntroJsPage)
  },
  {
    path: 'nivel10',
    loadComponent: () => import('./nivel10/nivel10.page').then( m => m.Nivel10Page)
  },
  {
    path: 'nivel11',
    loadComponent: () => import('./nivel11/nivel11.page').then( m => m.Nivel11Page)
  },
  {
    path: 'nivel12',
    loadComponent: () => import('./nivel12/nivel12.page').then( m => m.Nivel12Page)
  },
  {
    path: 'logros',
    loadComponent: () => import('./logros/logros.page').then( m => m.LogrosPage)
  },
  {
    path: 'nivel13',
    loadComponent: () => import('./nivel13/nivel13.page').then( m => m.Nivel13Page)
  },
];