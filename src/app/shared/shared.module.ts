import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    NoPageFoundComponent,
    SidebarComponent,
    ModalUploadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    NoPageFoundComponent,
    SidebarComponent,
    ModalUploadComponent
  ]
})
export class SharedModule { }
