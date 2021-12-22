import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { ResponseModel } from '../models/response.model';
import { Telefone } from '../models/telefone.model';
import { MatSnackBar } from '@angular/material/snack-bar';



const apiUrl = "http://localhost:8084/api";

@Injectable({
  providedIn: 'root',
})
export class TelefoneService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  httpMethodsUrls = {
    getAll: `${apiUrl}/telefones`,
    cadastrar: `${apiUrl}/cadastrarTel/telefone`,
    editar: `${apiUrl}/editarTel/telefone`,
    remover: `${apiUrl}/removerTel/`,
  };
  getAll(): Observable<any> {
    return this.http
      .get<any>(`${this.httpMethodsUrls.getAll}`,)
      .pipe(catchError(this.errorHandler));
  }

  cadastrar(telefone: Telefone): Observable<Telefone>{
    return this.http.post<Telefone>(this.httpMethodsUrls.cadastrar, telefone);
  }

  remover(cod: number): Observable<void>{
    return this.http.delete<void>(`${this.httpMethodsUrls.remover}`+`${cod}`);
  }

  editar(telefone: Telefone): Observable<Telefone>{
    return this.http.post<Telefone>(this.httpMethodsUrls.editar, telefone);
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
