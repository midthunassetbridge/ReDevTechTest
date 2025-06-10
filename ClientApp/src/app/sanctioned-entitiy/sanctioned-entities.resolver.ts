import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SanctionedEntity } from '../models/sanctioned-entity';
import { SanctionedEntitiesService } from './services/sanctioned-entities.service';

@Injectable({ providedIn: 'root' })
export class SanctionedEntitiesResolver implements Resolve<SanctionedEntity[]> {
  constructor(private service: SanctionedEntitiesService) {}

  resolve(): Observable<SanctionedEntity[]> {
    return this.service.getSanctionedEntities();
  }
}