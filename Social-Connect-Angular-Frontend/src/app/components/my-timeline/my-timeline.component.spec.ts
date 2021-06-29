import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTimelineComponent } from './my-timeline.component';

describe('MyTimelineComponent', () => {
  let component: MyTimelineComponent;
  let fixture: ComponentFixture<MyTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
