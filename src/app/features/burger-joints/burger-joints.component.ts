import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BurgerJointsDataAccessService } from './data-access/burger-joints-data-access.service';
import { BurgerJointsFacadeService } from './domain/burger-joints-facade.service';
import { BurgerJointPhotosService } from './domain/burger-joints-photos.service';
import { BurgerJointsService } from './domain/burger-joints.service';
import { BurgerJointPhotoUrl } from './model/burger-joints.model';
import { BurgerJointsStateService } from './state/burger-joints-state.service';
import { BurgerJointPhotoHighlightDirective } from './ui/burger-joint-photo-highlight/burger-joint-photo-highlight.directive';
import { BurgerJointsMapComponent } from './ui/burger-joints-map/burger-joints-map.component';

@Component({
  selector: 'venues-burger-joints',
  standalone: true,
  imports: [BurgerJointsMapComponent, BurgerJointPhotoHighlightDirective],
  providers: [
    BurgerJointsDataAccessService,
    BurgerJointsStateService,
    BurgerJointsService,
    BurgerJointPhotosService,
    BurgerJointsFacadeService,
  ],
  templateUrl: './burger-joints.component.html',
  styleUrl: './burger-joints.component.scss',
})
export class BurgerJointsComponent {
  facade = inject(BurgerJointsFacadeService);

  shouldHighlightPhoto(photoUrl: BurgerJointPhotoUrl): Observable<boolean> {
    return this.facade.photoContainsBurger(photoUrl);
  }
}
