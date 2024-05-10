import { computed, inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BurgerJointPhotoUrl } from '../model/burger-joints.model';
import { BurgerJointsStateService } from '../state/burger-joints-state.service';
import { BurgerJointPhotosService } from './burger-joints-photos.service';
import { BurgerJointsService } from './burger-joints.service';
import { toBurgerJointMarkers } from './util/burger-joints.utils';

@Injectable({
  providedIn: 'root',
})
export class BurgerJointsFacadeService implements OnDestroy {
  private state = inject(BurgerJointsStateService);
  private service = inject(BurgerJointsService);
  private photoService = inject(BurgerJointPhotosService);
  burgerJoints = this.state.burgerJoints;
  burgerJointsLocations = computed(() =>
    toBurgerJointMarkers(this.state.burgerJoints())
  );

  burgerJointsSubscription = this.service.burgerJointsPipeline$.subscribe(
    (burgerJoints) => this.state.burgerJoints.set(burgerJoints)
  );

  ngOnDestroy(): void {
    this.burgerJointsSubscription.unsubscribe();
  }

  photoContainsBurger(url: BurgerJointPhotoUrl): Observable<boolean> {
    return !!url ? this.photoService.photoContainsBurger(url) : of(false);
  }
}
