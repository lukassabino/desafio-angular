import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItensComponent } from './itens/itens.component';
import { ListItensComponent } from './itens/list-itens/list-itens.component';

const routes: Routes = [    
{path: '', component: ListItensComponent},
{path: 'item', component: ItensComponent},
{path: 'lista', component: ListItensComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
