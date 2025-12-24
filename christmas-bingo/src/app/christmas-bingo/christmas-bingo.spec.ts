import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristmasBingo } from './christmas-bingo';

describe('ChristmasBingo', () => {
  let component: ChristmasBingo;
  let fixture: ComponentFixture<ChristmasBingo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChristmasBingo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristmasBingo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
