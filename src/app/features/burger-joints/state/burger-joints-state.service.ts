import { Injectable, signal } from '@angular/core';
import { BurgerJoints } from '../model/burger-joints.model';

@Injectable()
export class BurgerJointsStateService {
  burgerJoints = signal<BurgerJoints>([]);
}
