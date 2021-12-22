import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogTelefoneComponent } from '../dialog-telefone/dialog-telefone.component';
import { Telefone } from '../models/telefone.model';
import { ClienteService } from '../services/cliente.service';
import { TelefoneService } from '../services/telefone.service';

@Component({
  selector: 'app-telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.css']
})
export class TelefoneComponent implements OnInit {

  displayedColumns: string[] = [
    'codigoTelefone',
    'numeroTelefone',
    'nomeCliente',
    'select',
   ];

   
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(  
     private service: TelefoneService,
     private clienteService: ClienteService,
     private _dialog: MatDialog,
    
    ) { }

  ngOnInit(): void {
    this.carregaTabela();
  }

  model: Telefone = {
    codigoCliente: 0,
    nomeCliente: '',
    codigoTelefone: 0,
    descricaoTelefone: '',
    numeroTelefone: ''
  };

  carregaTabela(){
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
   this.service.getAll().subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      // this.loading = false;
    });
  }

  cadastrar(): void {
    const dialogRef = this._dialog.open(DialogTelefoneComponent, {
      height: '240px',
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
    this.service.remover(element.codigoTelefone).subscribe(
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
    // console.log(element);
    // this.model.nomeCliente = element.nomeCliente;
    // this.model.enderecoCliente = element.enderecoCliente;
    // this.model.bairroCliente = element.bairroCliente;
    // this.model.codigoTelefone = element.codigoTelefone;
    // this.clienteService.editar(this.model).subscribe(
    //   (data:any) => {
    //     console.log(data);
    //     if (data) {
    //       if (data.codigo === 1) {
    //         this.clienteService.mensagem(data.mensagem);
    //         this.carregaTabela();
    //       } else {
    //         if(data.codigo === 99){
    //         this.clienteService.mensagem(data.mensagem);
    //         this.carregaTabela();
    //         }else{
    //         this.clienteService.mensagem(data.mensagem);
    //         this.carregaTabela();
    //         }
    //     }
    //   }
    //   },
    // );
  }

}
