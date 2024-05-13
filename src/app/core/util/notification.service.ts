import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackbar: MatSnackBar = inject(MatSnackBar);
  gatheringData$ = new BehaviorSubject(false);

  notifyUser(msg: string) {
    this.snackbar.open(msg, undefined, { duration: 3000 });
  }
}
