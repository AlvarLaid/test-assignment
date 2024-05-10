import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerJointsComponent } from './burger-joints.component';

describe('BurgerJointsComponent', () => {
  let component: BurgerJointsComponent;
  let fixture: ComponentFixture<BurgerJointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerJointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BurgerJointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
