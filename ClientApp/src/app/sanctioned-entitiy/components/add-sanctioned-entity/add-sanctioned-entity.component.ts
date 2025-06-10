import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SanctionedEntity } from 'src/app/models/sanctioned-entity';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-add-entity',
  templateUrl: './add-sanctioned-entity.component.html',
  styleUrls: ['./add-sanctioned-entity.component.css']
})
export class AddSanctionedEntityComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    domicile: ['', Validators.required],
    accepted: [false]
  });
  error = '';

  constructor(private fb: FormBuilder,  private entitySrv: SanctionedEntitiesService,  private toast: ToastService   ) {}

  submit() {
 if (this.form.invalid) 
      return;
    
    const dto = this.form.value as SanctionedEntity;
    this.entitySrv.createSanctionedEntity(dto)
      .subscribe({
    next: () => {
          this.toast.success('Sanctioned Entity added successfully!');
          this.form.reset({ accepted: false });
        },
        
        error: err => {
          this.toast.error(err.error?.message || 'Failed to add entity');
        }
      });
  }
}