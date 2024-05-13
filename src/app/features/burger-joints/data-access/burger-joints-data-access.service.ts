import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NotificationService } from '@core/util';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  BurgerJointPhotoUrl,
  BurgerJointPlacesResponseBody,
} from '../model/burger-joints.model';

@Injectable()
export class BurgerJointsDataAccessService {
  private http = inject(HttpClient);
  private notifications = inject(NotificationService);
  private foursquarePlacesUrl = 'https://api.foursquare.com/v3/places/search';
  private photoApiUrl =
    'https://73kh1kvgx4.execute-api.eu-west-1.amazonaws.com/prod/recognize';

  fetchBurgerJoints() {
    this.notifications.gatheringData$.next(true);
    const headers = new HttpHeaders({
      Authorization: environment.apiKeys.fourSquare,
      accept: 'application/json',
    });
    const params = new HttpParams({
      fromObject: {
        categories: '13031',
        fields: 'fsq_id,geocodes,name,photos,distance',
        limit: '50',
        ll: '58.3780,26.7321',
        radius: 5500,
      },
    });
    return this.http
      .get<BurgerJointPlacesResponseBody>(this.foursquarePlacesUrl, {
        headers,
        params,
      })
      .pipe(
        map((response) => response.results),
        catchError(() => {
          this.notifications.notifyUser('Failed to fetch burger joints');
          return EMPTY;
        })
      );
  }

  checkPhotoForBurgers(photoUrl: BurgerJointPhotoUrl): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(this.photoApiUrl, { urls: [photoUrl] }, { headers })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.BadRequest) {
            this.notifications.notifyUser(
              'Failed to check an image for a burger'
            );
          }
          return of(false);
        })
      );
  }
}
