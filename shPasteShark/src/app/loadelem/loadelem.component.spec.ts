import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadelemComponent } from './loadelem.component';

describe('LoadelemComponent', () => {
  let component: LoadelemComponent;
  let fixture: ComponentFixture<LoadelemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadelemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadelemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
