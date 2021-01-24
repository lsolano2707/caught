import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningInfoComponent } from './listening-info.component';

describe('ListeningInfoComponent', () => {
  let component: ListeningInfoComponent;
  let fixture: ComponentFixture<ListeningInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeningInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
