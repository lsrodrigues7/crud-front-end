import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Telefone } from '../models/telefone.model';
import { TelefoneService } from '../services/telefone.service';

@Component({
  selector: 'app-dialog-telefone',
  templateUrl: './dialog-telefone.component.html',
  styleUrls: ['./dialog-telefone.component.css']
})
export class DialogTelefoneComponent implements OnInit {

  txtNumeroTelefone!:string;
   model: Telefone = {
     nomeCliente: '',
     codigoTelefone: 0,
     codigoCliente: 0,
     descricaoTelefone: '',
     numeroTelefone: ''
   };

   formCliente: any;

  

  constructor(public dialogRef: MatDialogRef<DialogTelefoneComponent>,   
    // private service: ClienteService,
    private service: TelefoneService) { }

  ngOnInit(): void {

  }


  onSubmit(){
    console.log(this.formCliente.value)
  }

  cadastrar() {
    this.model.numeroTelefone = this.txtNumeroTelefone;
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


}
