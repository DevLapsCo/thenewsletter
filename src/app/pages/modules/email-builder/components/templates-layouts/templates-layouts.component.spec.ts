import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesLayoutsComponent } from './templates-layouts.component';

describe('TemplatesLayoutsComponent', () => {
  let component: TemplatesLayoutsComponent;
  let fixture: ComponentFixture<TemplatesLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesLayoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatesLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
