import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaylistComponent } from './displaylist.component';

describe('DisplaylistComponent', () => {
  let component: DisplaylistComponent;
  let fixture: ComponentFixture<DisplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
