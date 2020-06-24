import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthenticationGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }
            },
            {
                path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }
            },
            {
                path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' }
            },
            {
                path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }
            },
            {
                path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }
            },
            {
                path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' }
            },
            // Mantenimientos
            {
                path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' }
            },
            {
                path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' }
            },
            {
                path: '', redirectTo: '/dashboard', pathMatch: 'full'
            },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
