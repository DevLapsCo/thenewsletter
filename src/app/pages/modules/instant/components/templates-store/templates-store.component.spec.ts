import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesStoreComponent } from './templates-store.component';

describe('TemplatesStoreComponent', () => {
  let component: TemplatesStoreComponent;
  let fixture: ComponentFixture<TemplatesStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatesStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
