import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { GuardService } from './services/guard';

const routes: Routes = [
{ path: '', component: ListagemComponent },
{ path: 'detalhes', component: DetalhesComponent, canActivate: [GuardService] },
{ path: 'carrinho', component: CarrinhoComponent, canActivate: [GuardService] },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
