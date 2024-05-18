import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachDetailsComponent } from './coach-details.component';

describe('CoachDetailsComponent', () => {
  let component: CoachDetailsComponent;
  let fixture: ComponentFixture<CoachDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachDetailsComponent]
    });
    fixture = TestBed.createComponent(CoachDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
