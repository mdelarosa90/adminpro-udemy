import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(public medicoService: MedicoService, private modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();
    this.modalUploadService.notification.subscribe(() => this.cargarMedicos());
  }

  cargarMedicos() {
    this.medicoService.cargarMedicos().subscribe(medicos => this.medicos = medicos);
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedico(termino).subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
    });
  }

  borrarMedico(medico: Medico) {
    swal({
      title: 'Está seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(borrar => {
      if (borrar) {
        this.medicoService.borrarMedico(medico._id).subscribe(() => this.cargarMedicos());
      }
    });
  }

  mostrarMedico(medico: Medico) {
    this.modalUploadService.mostrarModal('medicos', medico._id);
  }

}
