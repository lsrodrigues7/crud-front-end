import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogClienteComponent } from '../dialog-cliente/dialog-cliente.component';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers:[ClienteService]
})
export class ClienteComponent implements OnInit {

  displayedColumns: string[] = [
    'codigoCliente',
    'nomeCliente',
    'enderecoCliente',
    'bairroCliente',
    'numeroTelefone',
    'select',
   ];

   
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(  
     private clienteService: ClienteService,
     private _dialog: MatDialog,
    
    ) { }

  ngOnInit(): void {
    this.carregaTabela();
  }

  model: Cliente = {
    nomeCliente: '',
    enderecoCliente:'',
    bairroCliente: '',
    codigoTelefone: 0,
    codigoCliente: 0
  };

  carregaTabela(){
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
   this.clienteService.getAllClientes().subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      // this.loading = false;
    });
  }


  cadastrarCliente(): void {
    const dialogRef = this._dialog.open(DialogClienteComponent, {
      height: '440px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if(data){
      if (data.codigo === 1) {
        this.clienteService.mensagem(data.mensagem);
        this.carregaTabela();
      } else {
        if(data.codigo === 99){
        this.clienteService.mensagem(data.mensagem);
        this.carregaTabela();
        }else{
        this.clienteService.mensagem(data.mensagem);
        this.carregaTabela();
        }
      }
    }
    });
  }

  remover(element) {
    console.log(element);
    this.clienteService.removerCliente(element.codigoCliente).subscribe(
      (data:any) => {
        console.log(data);
        if (data) {
          if (data.codigo === 1) {
            this.clienteService.mensagem(data.mensagem);
            this.carregaTabela();
          } else {
            if(data.codigo === 99){
            this.clienteService.mensagem(data.mensagem);
            this.carregaTabela();
            }else{
            this.clienteService.mensagem(data.mensagem);
            this.carregaTabela();
            }
          }
        }
      },
    );
  }



  editar(element) {
    console.log(element);
    this.model.nomeCliente = element.nomeCliente;
    this.model.enderecoCliente = element.enderecoCliente;
    this.model.bairroCliente = element.bairroCliente;
    this.model.codigoTelefone = element.codigoTelefone;
    this.clienteService.editar(this.model).subscribe(
      (data:any) => {
        console.log(data);
        if (data) {
          if (data.codigo === 1) {
            this.clienteService.mensagem(data.mensagem);
            this.carregaTabela();
          } else {
            if(data.codigo === 99){
            this.clienteService.mensagem(data.mensagem);
            this.carregaTabela();
            }else{
            this.clienteService.mensagem(data.mensagem);
            this.carregaTabela();
            }
        }
      }
      },
    );
  }
}
