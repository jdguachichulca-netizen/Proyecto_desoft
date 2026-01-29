import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    /* --- ESTE ES EL BLOQUE QUE TE PUEDE FALTAR --- */
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
];