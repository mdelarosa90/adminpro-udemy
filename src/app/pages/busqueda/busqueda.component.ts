import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.activateRoute.params.subscribe(params => {
      console.log(params.termino);
      const { termino } = params;
      this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    const url = API_URL + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      console.log(resp);
    });
  }

  editar(termino: string) {
    this.router.navigate([`/${termino}`]);
  }

  editarMedico(id: string) {
    this.router.navigate(['/medico', id]);
  }

}
