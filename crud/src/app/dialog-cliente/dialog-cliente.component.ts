import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectableObservable } from 'rxjs';
import { ClienteComponent } from '../cliente/cliente.component';
import { Cliente } from '../models/cliente.model';
import { Telefone } from '../models/telefone.model';
import { ClienteService } from '../services/cliente.service';
import { TelefoneService } from '../services/telefone.service';


@Component({
  selector: 'app-dialog-cliente',
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.css'],
  providers: [FormBuilder]
})

export class DialogClienteComponent implements OnInit {

  telefone!: Telefone;
  telefones!: Telefone[];
  telefoneStr!: string[];
  nome!: string;

  clientes!: Cliente[];

   model: Cliente = {
     nomeCliente: '',
     enderecoCliente: '',
     bairroCliente: '',
     codigoTelefone: 0,
     codigoCliente: 0,
   };

   formCliente: any;

  

  constructor(public dialogRef: MatDialogRef<DialogClienteComponent>,   
    private service: ClienteService,
    private serviceTel: TelefoneService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(this.model);
    this.selectTelefones();
    this.consultaClientes();
  }


  consultaClientes(){
    this.service.getAllClientes().subscribe((data) => {
      console.log(data);
      if(data){
      this.clientes = data;
      }
    })
  }


  createForm(cliente: Cliente){
    this.formCliente = new FormGroup({
      nomeCliente: new FormControl(cliente.nomeCliente),
      enderecoCliente: new FormControl(cliente.enderecoCliente),
      bairroCliente: new FormControl(cliente.bairroCliente),
      codigoTelefone: new FormControl(cliente.codigoTelefone),
    })
  }


  validaCadastro(){
    var nomeMinDez = this.model.nomeCliente.length;
    
    if(nomeMinDez > 10){
          var findNumeroInClientes: any;
          var findNomeInClientes: any;
        if(this.clientes != undefined){
          findNumeroInClientes = this.clientes.filter(i => i.codigoTelefone == this.model.codigoTelefone);
          findNomeInClientes = this.clientes.filter(i => i.nomeCliente == this.model.nomeCliente);
          if(findNomeInClientes.length == 0){
            if(findNumeroInClientes==0){
               this.cadastrar();
            }else{
              this.service.mensagem("Número cadastrado em outro cliente!")
            }
          }else{
            this.service.mensagem("Esse Cliente já está cadastrado!")
          }
        }else{
           this.cadastrar();
        }  
    } else{
      this.service.mensagem("O nome deve ter no mínimo dez caracteres!")
    }
  
  }

  cadastrar() {
    this.service.cadastrar(this.model).subscribe(
      (data:any) => {
        console.log(data);
        if (data) {
            this.dialogRef.close(data);
        }
      },
    );
  }

  voltar(){
    this.dialogRef.close();
  }

  selectTelefones() {
        this.serviceTel.getAll().subscribe((data) => {
            data ? (this.telefones = data) : null;
            if (this.telefones) {
              // console.log(data);
              this.telefoneStr = [];
              this.telefone = this.telefones[0];
              this.model.codigoTelefone = this.telefone.codigoTelefone;
              this.nome = this.telefone.nomeCliente;
            }
          });
      
    }

  setTelefone(event){
    this.telefone = event.value;
    if(this.telefone){
      this.model.codigoTelefone = this.telefone.codigoTelefone;
      this.nome = this.telefone.nomeCliente;
      console.log(this.model.codigoTelefone);
    }
  }

}
