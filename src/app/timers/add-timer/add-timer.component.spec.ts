import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimerComponent } from './add-timer.component';

describe('AddTimerComponent', () => {
  let component: AddTimerComponent;
  let fixture: ComponentFixture<AddTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
