


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SanctionedEntitiesComponent } from './components/sanctioned-entities/sanctioned-entities.component';
import { AddSanctionedEntityComponent } from './components/add-sanctioned-entity/add-sanctioned-entity.component';
import { SanctionedEntitiesResolver } from './sanctioned-entities.resolver';


const routes: Routes = [
  { path: '', component: SanctionedEntitiesComponent,resolve: { entities: SanctionedEntitiesResolver } },
  { path: 'add', component: AddSanctionedEntityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanctionedEntitiesRoutingModule {}

