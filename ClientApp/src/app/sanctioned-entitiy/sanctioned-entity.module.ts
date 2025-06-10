import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SanctionedEntitiesComponent } from './components/sanctioned-entities/sanctioned-entities.component';
import { AddSanctionedEntityComponent } from './components/add-sanctioned-entity/add-sanctioned-entity.component';
import { SanctionedEntitiesRoutingModule } from './sanctioned-entity-routing.module';
import { SanctionedEntitiesService } from './services/sanctioned-entities.service';


@NgModule({
  declarations: [
    SanctionedEntitiesComponent,
    AddSanctionedEntityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SanctionedEntitiesRoutingModule
  ],
  providers: [SanctionedEntitiesService],
})
export class SanctionedEntitiesModule {}