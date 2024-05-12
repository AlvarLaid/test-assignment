import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { BurgerJointsFacadeService } from '../../domain/burger-joints-facade.service';

@Directive({
  selector: '[venuesBurgerJointPhotoSize]',
  standalone: true,
})
export class BurgerJointPhotoSizeDirective implements AfterViewInit, OnDestroy {
  elRef = inject(ElementRef);
  facade = inject(BurgerJointsFacadeService);
  observer?: ResizeObserver;

  ngAfterViewInit(): void {
    this.observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const size = Math.ceil(entries[0].contentRect.width / 3);
      this.facade.updateBurgerJointPhotoSize(size);
    });

    this.observer.observe(this.elRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
