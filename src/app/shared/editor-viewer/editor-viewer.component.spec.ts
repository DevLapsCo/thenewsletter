import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorViewerComponent } from './editor-viewer.component';

describe('EditorViewerComponent', () => {
  let component: EditorViewerComponent;
  let fixture: ComponentFixture<EditorViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
