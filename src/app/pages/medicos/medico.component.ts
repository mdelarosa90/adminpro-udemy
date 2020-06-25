import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicoService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: any) => {
      const id = params.id;
      if (id !== 'new') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe((res: any) => this.hospitales = res.hospitales);
  }

  cargarMedico(id: string) {
    this.medicoService.obtenerMedico(id).subscribe(medico => {
      this.medico = { ...medico, hospital: medico.hospital._id };
      this.cambiarHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    this.medicoService.guardarMedico(this.medico).subscribe((medico: any) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambiarHospital(id: string) {
    console.log('ID', id);
    this.hospitalService.obtenerHospital(id).subscribe(hospital => this.hospital = hospital);
  }

}
