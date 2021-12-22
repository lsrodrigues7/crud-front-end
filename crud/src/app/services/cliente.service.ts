import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { ResponseModel } from '../models/response.model';
import { Cliente } from '../models/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';



const apiUrl = "http://localhost:8084/api";

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  httpMethodsUrls = {
    getAllClientes: `${apiUrl}/clientes`,
    cadastrarCliente: `${apiUrl}/cadastrar/cliente`,
    editarCliente: `${apiUrl}/cadastrar/editar`,
    removerCliente: `${apiUrl}/remover/`,
  };
  getAllClientes(): Observable<any> {
    return this.http
      .get<any>(`${this.httpMethodsUrls.getAllClientes}`,)
      .pipe(catchError(this.errorHandler));
  }

  cadastrar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.httpMethodsUrls.cadastrarCliente, cliente);
  }

  removerCliente(cod: number): Observable<void>{
    return this.http.delete<void>(`${this.httpMethodsUrls.removerCliente}`+`${cod}`);
  }

  editar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.httpMethodsUrls.editarCliente, cliente);
  }
  //, messageType: 'error' | 'success'
  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'styled',
    })
  }
 

  
  errorHandler(e:any) {
    let errorMessage = '';
    if (e.error instanceof ErrorEvent) {
      errorMessage = e.error.message;
    } else {
      errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
    }
    console.log(`Error Code: ${e.status} - Message: ${e.message}`);
    return throwError(errorMessage);
  }
}
