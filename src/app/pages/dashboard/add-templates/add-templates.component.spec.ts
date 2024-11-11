import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemplatesComponent } from './add-templates.component';

describe('AddTemplatesComponent', () => {
  let component: AddTemplatesComponent;
  let fixture: ComponentFixture<AddTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTemplatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
