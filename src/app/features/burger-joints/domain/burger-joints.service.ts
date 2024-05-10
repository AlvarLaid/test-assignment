import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { NotificationService } from 'src/app/core/util/notification.service';
import { BurgerJointsDataAccessService } from '../data-access/burger-joints-data-access.service';
import {
  burgerJointsInRadius,
  rawDataToBurgerJoints,
} from './util/burger-joints.utils';

@Injectable()
export class BurgerJointsService {
  private dataAccess = inject(BurgerJointsDataAccessService);
  private notifications = inject(NotificationService);

  burgerJointsPipeline$ = this.dataAccess.fetchBurgerJoints().pipe(
    map((burgerJointsRaw) => burgerJointsInRadius(burgerJointsRaw, 1000)),
    map(rawDataToBurgerJoints),
    tap(() => this.notifications.gatheringData$.next(false))
  );
}
