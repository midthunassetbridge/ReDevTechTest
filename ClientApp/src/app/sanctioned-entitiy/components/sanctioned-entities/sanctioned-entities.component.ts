import { Component } from '@angular/core';
import { SanctionedEntity } from '../../../models/sanctioned-entity';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sanctioned-entities',
  templateUrl: './sanctioned-entities.component.html'
})
export class SanctionedEntitiesComponent {
  public entities: SanctionedEntity[] = [];

  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.entities = this.route.snapshot.data['entities'];
  }
}
