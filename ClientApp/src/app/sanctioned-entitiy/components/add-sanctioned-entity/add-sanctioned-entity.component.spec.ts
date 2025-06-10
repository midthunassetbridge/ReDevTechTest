import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AddSanctionedEntityComponent } from './add-sanctioned-entity.component';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';
import { ToastService } from 'src/app/services/toast.service';
import { SanctionedEntity } from 'src/app/models/sanctioned-entity';

describe('AddSanctionedEntityComponent', () => {
  let component: AddSanctionedEntityComponent;
  let fixture: ComponentFixture<AddSanctionedEntityComponent>;
  let entitySrv: jasmine.SpyObj<SanctionedEntitiesService>;
  let toastSrv: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    const entitySpy = jasmine.createSpyObj('SanctionedEntitiesService', ['createSanctionedEntity']);
    const toastSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddSanctionedEntityComponent],
      providers: [
        FormBuilder,
        { provide: SanctionedEntitiesService, useValue: entitySpy },
        { provide: ToastService, useValue: toastSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSanctionedEntityComponent);
    component = fixture.componentInstance;

    entitySrv = TestBed.inject(
      SanctionedEntitiesService
    ) as jasmine.SpyObj<SanctionedEntitiesService>;
    toastSrv = TestBed.inject(
      ToastService
    ) as jasmine.SpyObj<ToastService>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  

  it('should call service and show success toast on valid submit', fakeAsync(() => {
    const dto: SanctionedEntity = {
        
      name: 'A',
      domicile: 'B',
      accepted: true
    } as any;

   
    entitySrv.createSanctionedEntity.and.returnValue(of(dto));


    component.form.setValue({ name: 'A', domicile: 'B', accepted: true });
    component.submit();
    tick();  
    expect(entitySrv.createSanctionedEntity).toHaveBeenCalledWith(dto);
    expect(toastSrv.success).toHaveBeenCalledWith('Sanctioned Entity added successfully!');
    expect(component.error).toBe(''); 
    
    expect(component.form.value.accepted).toBeFalse();
  }));

  it('should call error toast on service error', fakeAsync(() => {
    const dto: SanctionedEntity = { id: '', name: 'X', domicile: 'Y', accepted: false } as any;
    const serverErr = { error: { message: 'Dup!' } };

    entitySrv.createSanctionedEntity.and.returnValue(throwError(() => serverErr));

    component.form.setValue({ name: 'X', domicile: 'Y', accepted: false });
    component.submit();
    tick();

    expect(entitySrv.createSanctionedEntity).toHaveBeenCalled();
    expect(toastSrv.error).toHaveBeenCalledWith('Dup!');
  }));
});
