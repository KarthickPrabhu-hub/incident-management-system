import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnCall } from './on-call';

describe('OnCall', () => {
  let component: OnCall;
  let fixture: ComponentFixture<OnCall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnCall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnCall);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
