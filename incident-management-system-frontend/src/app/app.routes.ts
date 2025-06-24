import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
  path: 'login',
  loadComponent: () =>
    import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'incidents',
    loadComponent: () =>
      import('./pages/incidents/incidents').then(m => m.Incidents)
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./pages/analytics/analytics').then(m => m.Analytics)
  },
  {
    path: 'on-call',
    loadComponent: () =>
      import('./pages/on-call/on-call').then(m => m.OnCall)
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings').then(m => m.Settings)
  }
];

