import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaterComponent } from './automater.component';

describe('AutomaterComponent', () => {
  let component: AutomaterComponent;
  let fixture: ComponentFixture<AutomaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutomaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
