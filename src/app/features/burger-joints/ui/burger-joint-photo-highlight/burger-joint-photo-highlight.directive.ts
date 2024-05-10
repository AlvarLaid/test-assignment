import {
  Directive,
  effect,
  HostBinding,
  inject,
  input,
  signal,
} from '@angular/core';
import { first } from 'rxjs';
import { BurgerJointsFacadeService } from '../../domain/burger-joints-facade.service';

@Directive({
  selector: '[venuesBurgerJointPhotoHighlight]',
  standalone: true,
})
export class BurgerJointPhotoHighlightDirective {
  photoUrl = input.required<string | undefined>();
  shouldHighlight = signal(false);
  facade = inject(BurgerJointsFacadeService);

  @HostBinding(`class.highlight`) get applyHighlight() {
    return this.shouldHighlight();
  }

  effectRef = effect(
    () => {
      if (!this.photoUrl) {
        this.shouldHighlight.set(false);
        return;
      }

      this.facade
        .photoContainsBurger(this.photoUrl())
        .pipe(first())
        .subscribe((v) => {
          this.shouldHighlight.set(v);
        });
    },
    { allowSignalWrites: true }
  );
}
