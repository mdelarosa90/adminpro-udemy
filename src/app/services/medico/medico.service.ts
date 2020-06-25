import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = API_URL + '/medico';

    return this.http.get(url).pipe(map((resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }

  buscarMedico(termino: string) {
    const url = API_URL + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.medicos));
  }

  borrarMedico(id: string) {
    const url = API_URL + '/medico/' + id + '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe(map(resp => {
      swal('Medico borrado', 'El medico ha sido borrado exitosamente', 'success');
      return true;
    }));
  }

  guardarMedico(medico: Medico) {
    let url = API_URL + '/medico';
    if (medico._id) {
      url += '/' + medico._id + '?token=' + this.usuarioService.token;
      return this.http.put(url, medico).pipe(map((resp: any) => {
        swal('Medico Actualizado', 'El medico ha sido actualizado exitosamente', 'success');
        return resp.medico;
      }));
    } else {
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, medico).pipe(map((resp: any) => {
        swal('Medico Creado', 'El medico ha sido creado exitosamente', 'success');
        return resp.medico;
      }));

    }
  }

  obtenerMedico(id: string) {
    const url = API_URL + '/medico/' + id;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.medico;
    }));
  }

}
