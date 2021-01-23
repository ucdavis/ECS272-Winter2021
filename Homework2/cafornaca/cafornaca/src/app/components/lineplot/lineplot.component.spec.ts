import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineplotComponent } from './lineplot.component';

describe('LineplotComponent', () => {
  let component: LineplotComponent;
  let fixture: ComponentFixture<LineplotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineplotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
