import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/app-layout/app-layout.component')
      .then(m => m.AppLayoutComponent),
    children: [
      { path: '', redirectTo: 'bottles', pathMatch: 'full' },
      {
        path: 'bottles',
        loadComponent: () => import('./features/wine-list/wine-list.component')
          .then(m => m.WineListComponent)
      },
      {
        path: 'bottles/new',
        loadComponent: () => import('./features/wine-form/wine-form.component')
          .then(m => m.WineFormComponent)
      },
      {
        path: 'bottles/:id',
        loadComponent: () => import('./features/wine-detail/wine-detail.component')
          .then(m => m.WineDetailComponent)
      },
      {
        path: 'bottles/:id/edit',
        loadComponent: () => import('./features/wine-form/wine-form.component')
          .then(m => m.WineFormComponent)
      },
    ]
  },
  { path: '**', redirectTo: 'bottles' }
];
