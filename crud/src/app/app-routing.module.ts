import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { SobreComponent } from './sobre/sobre.component';
import { TelefoneComponent } from './telefone/telefone.component';

const routes: Routes = [
  { path: 'sobre', component:  SobreComponent},
  { path: 'cliente', component:  ClienteComponent},
  { path: 'telefone', component:  TelefoneComponent},
  // { path: '', component:  SobreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
