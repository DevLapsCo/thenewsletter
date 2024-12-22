import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsMiniComponent } from './groups-mini.component';

describe('GroupsMiniComponent', () => {
  let component: GroupsMiniComponent;
  let fixture: ComponentFixture<GroupsMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsMiniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupsMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
