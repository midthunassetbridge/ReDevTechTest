import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SanctionedEntitiesComponent } from './sanctioned-entities.component';
import { SanctionedEntity } from '../../../models/sanctioned-entity';

describe('SanctionedEntitiesComponent', () => {
  let component: SanctionedEntitiesComponent;
  let fixture: ComponentFixture<SanctionedEntitiesComponent>;
  const mockEntities: SanctionedEntity[] = [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Entity A', domicile: 'X', accepted: true },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Entity B', domicile: 'Y', accepted: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanctionedEntitiesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { entities: mockEntities } } }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionedEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load resolved entities into `entities`', () => {
    expect(component.entities).toEqual(mockEntities);
  });
});