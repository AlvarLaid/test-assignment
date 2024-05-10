import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BurgerJointsDataAccessService } from '../data-access/burger-joints-data-access.service';
import { BurgerJointPhotoUrl } from '../model/burger-joints.model';

@Injectable()
export class BurgerJointPhotosService {
  dataAccess = inject(BurgerJointsDataAccessService);

  photoContainsBurger(url: BurgerJointPhotoUrl): Observable<boolean> {
    return this.dataAccess
      .checkPhotoForBurgers(url)
      .pipe(map(({ urlWithBurger }) => !!urlWithBurger));
  }
}
