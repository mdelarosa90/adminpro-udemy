import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';

const appRoutes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: '**', component: NoPageFoundComponent
    },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
