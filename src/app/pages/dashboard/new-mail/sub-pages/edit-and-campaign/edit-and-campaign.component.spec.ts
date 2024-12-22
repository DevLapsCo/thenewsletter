import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAndCampaignComponent } from './edit-and-campaign.component';

describe('EditAndCampaignComponent', () => {
  let component: EditAndCampaignComponent;
  let fixture: ComponentFixture<EditAndCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAndCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAndCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
