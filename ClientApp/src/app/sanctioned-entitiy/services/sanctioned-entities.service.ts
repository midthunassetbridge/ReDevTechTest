import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SanctionedEntity } from 'src/app/models/sanctioned-entity';

@Injectable({ providedIn: 'root' })
export class SanctionedEntitiesService {
  private readonly apiUrl: string;
  private readonly path = 'sanctioned-entities';

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.apiUrl = baseUrl + 'api/';
  }

  public getSanctionedEntities(): Observable<SanctionedEntity[]> {
    const url = `${this.apiUrl}${this.path}`;
    return this.http.get<SanctionedEntity[]>(url);
  }

  public createSanctionedEntity(entity: SanctionedEntity): Observable<SanctionedEntity> {
    const url = `${this.apiUrl}${this.path}`;
    return this.http.post<SanctionedEntity>(url, entity);
  }
}