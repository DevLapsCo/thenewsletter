import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitEmailComponent } from './await-email.component';

describe('AwaitEmailComponent', () => {
  let component: AwaitEmailComponent;
  let fixture: ComponentFixture<AwaitEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwaitEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwaitEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
