import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  declarations: [
    DashboardComponent,
    Graficas1Component,
    PagesComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES
  ],
  exports: [
    DashboardComponent,
    Graficas1Component,
    PagesComponent,
    ProgressComponent
  ]
})
export class PagesModule { }
