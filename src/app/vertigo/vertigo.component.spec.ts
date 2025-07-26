import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VertigoComponent } from './vertigo.component';

describe('VertigoComponent', () => {
  let component: VertigoComponent;
  let fixture: ComponentFixture<VertigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VertigoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VertigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
