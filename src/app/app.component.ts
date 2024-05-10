import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BurgerJointsComponent } from '@burger-joints';
import { NotificationService } from './core/util/notification.service';

@Component({
  selector: 'venues-root',
  standalone: true,
  imports: [BurgerJointsComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  notifications = inject(NotificationService);
  title = 'Venues';
}
