import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(private http: HttpClient, private router: Router, private subirArchivoService: SubirArchivoService) { this.cargarStorage() }


  renuevaToken() {
    const url = API_URL + '/login/renuevatoken?token=' + this.token;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log('TOKEN RENOVADO');
        return true;
      }))
      .pipe(catchError(err => {
        this.logOut();
        swal('No se pudo renovar Token', 'No fue posible renovar token', 'error');
        return of(err);
      }));
  }

  isAuthenticated() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle(token: string) {
    const url = API_URL + '/login/google';
    return this.http.post(url, { token }).pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuarios, resp.menu);
      return true;
    }));
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = API_URL + '/login';
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuarios, res.menu);
        return true;
      })).pipe(catchError((err) => {
        swal('Credenciales Incorrectas', err.error.mensaje, 'error');
        return of(err);
      }));
  }

  crearUsuario(usuario: Usuario) {
    const url = API_URL + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return res.usuario;
      }))
      .pipe(catchError(err => {
        console.log(err);
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return of(err);
      }));

  }

  actualizarUsuario(usuario: Usuario) {
    let url = API_URL + '/usuario/' + usuario._id;
    url += `?token=${this.token}`;

    return this.http.put(url, usuario).pipe(map((resp: any) => {
      if (usuario._id === this.usuario._id) {
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
      }
      swal('Usuario Actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen(file: File, id: string) {
    this.subirArchivoService.subirArchivo(file, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(err => console.log(err));
  }

  cargarUsuarios(desde: number = 0) {
    const url = API_URL + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = API_URL + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: string) {
    const url = API_URL + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(map(resp => {
      swal('Usuario borrado', 'El usuario ha sido borrado exitosamente', 'success');
      return true;
    }));
  }
}
