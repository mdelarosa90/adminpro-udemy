import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  cargarHospitales(desde: number = 0) {
    const url = API_URL + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    const url = API_URL + '/hospital/' + id;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.hospital;
    }));
  }

  borrarHospital(id: string) {
    const url = API_URL + '/hospital/' + id + '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe(map(resp => {
      swal('Hospital borrado', 'El hospital ha sido borrado exitosamente', 'success');
      return true;
    }));
  }

  crearHospital(nombre: string) {
    const url = API_URL + '/hospital?token=' + this.usuarioService.token;
    return this.http.post(url, { nombre }).pipe(map((res: any) => {
      swal('Hospital creado', nombre, 'success');
      return res.hospital;
    }));
  }

  buscarHospital(termino: string) {
    const url = API_URL + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    let url = API_URL + '/hospital/' + hospital._id;
    url += `?token=${this.usuarioService.token}`;

    return this.http.put(url, hospital).pipe(map((resp: any) => {
      swal('Hospital Actualizado', hospital.nombre, 'success');
      return true;
    }));
  }
}
