import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArchiveComponent } from './single-archive.component';

describe('SingleArchiveComponent', () => {
  let component: SingleArchiveComponent;
  let fixture: ComponentFixture<SingleArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
