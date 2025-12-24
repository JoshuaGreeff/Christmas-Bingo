import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChristmasBingoComponent } from './christmas-bingo';

describe('ChristmasBingoComponent', () => {
  let component: ChristmasBingoComponent;
  let fixture: ComponentFixture<ChristmasBingoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChristmasBingoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChristmasBingoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

