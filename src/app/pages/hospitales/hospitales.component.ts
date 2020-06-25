import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    private modalUploadService: ModalUploadService,
    private hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notification.subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this.hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Está seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(borrar => {
      if (borrar) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(() => this.cargarHospitales());
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }

  mostrarModal(hospital: Hospital) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id);
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then((name: string) => {
      if (!name || name.length === 0) {
        return;
      }
      this.hospitalService.crearHospital(name).subscribe(() => this.cargarHospitales());
    });
  }
}
