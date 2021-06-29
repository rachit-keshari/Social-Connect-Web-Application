import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidInfoComponent } from './covid-info.component';

describe('CovidInfoComponent', () => {
  let component: CovidInfoComponent;
  let fixture: ComponentFixture<CovidInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
