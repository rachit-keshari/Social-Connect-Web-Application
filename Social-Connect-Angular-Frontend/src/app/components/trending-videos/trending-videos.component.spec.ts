import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingVideosComponent } from './trending-videos.component';

describe('TrendingVideosComponent', () => {
  let component: TrendingVideosComponent;
  let fixture: ComponentFixture<TrendingVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
