import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesMiniComponent } from './templates-mini.component';

describe('TemplatesMiniComponent', () => {
  let component: TemplatesMiniComponent;
  let fixture: ComponentFixture<TemplatesMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesMiniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatesMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
