import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import {
  AdminGuard,
  AuthenticationGuard,
  HospitalService,
  MedicoService,
  SettingsService,
  SharedService,
  SidebarService,
  SubirArchivoService,
  UsuarioService,
  VerificaTokenGuard
} from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    AuthenticationGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
