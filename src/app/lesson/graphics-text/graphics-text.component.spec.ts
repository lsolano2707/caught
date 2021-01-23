import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsTextComponent } from './graphics-text.component';

describe('GraphicsTextComponent', () => {
  let component: GraphicsTextComponent;
  let fixture: ComponentFixture<GraphicsTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
