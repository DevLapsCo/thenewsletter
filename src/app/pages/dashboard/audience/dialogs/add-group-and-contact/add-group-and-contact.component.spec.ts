import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupAndContactComponent } from './add-group-and-contact.component';

describe('AddGroupAndContactComponent', () => {
  let component: AddGroupAndContactComponent;
  let fixture: ComponentFixture<AddGroupAndContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroupAndContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGroupAndContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
