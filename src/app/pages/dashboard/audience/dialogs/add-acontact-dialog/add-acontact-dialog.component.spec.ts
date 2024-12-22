import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAContactDialogComponent } from './add-acontact-dialog.component';

describe('AddAContactDialogComponent', () => {
  let component: AddAContactDialogComponent;
  let fixture: ComponentFixture<AddAContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAContactDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
