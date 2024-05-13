import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BurgerJointsComponent } from '@burger-joints';
import { NotificationService } from '@core/util';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';

@Component({
  selector: 'venues-burger-joints',
  standalone: true,
  template: '<p>This is a mock component</p>',
})
class BurgerJointsComponentMock {
  constructor() {}
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj(
            'NotificationService',
            {},
            {
              gatheringData$: new BehaviorSubject<boolean>(false),
            }
          ),
        },
      ],
    })
      .overrideComponent(AppComponent, {
        remove: {
          imports: [BurgerJointsComponent],
        },
        add: {
          imports: [BurgerJointsComponentMock],
        },
      })
      .compileComponents();
  });

  describe('GIVEN that page is rendered', () => {
    it('THEN user sees heading', () => {
      const fixture = TestBed.createComponent(AppComponent);

      fixture.detectChanges();
      const title = fixture.debugElement.query(
        By.css('[data-testing="app-title"]')
      ).nativeElement.textContent;

      expect(title).toEqual('Venues');
    });

    it('THEN user sees powered by Foursquare copy', () => {
      const fixture = TestBed.createComponent(AppComponent);

      fixture.detectChanges();
      const title = fixture.debugElement.query(
        By.css('[data-testing="powered-by-foursquare"]')
      ).nativeElement.textContent;

      expect(title).toEqual('Powered by Foursquare');
    });

    describe('WHEN data is being gathered', () => {
      it('THEN user sees notification message', () => {
        const notificationService = TestBed.inject(NotificationService);
        const fixture = TestBed.createComponent(AppComponent);
        (
          Object.getOwnPropertyDescriptor(
            notificationService,
            'gatheringData$'
          )!.get! as any
        ).and.returnValue(new BehaviorSubject<boolean>(true));

        fixture.detectChanges();
        const notificationMessage = fixture.debugElement.query(
          By.css('[data-testing="notification-message"]')
        ).nativeElement.textContent;

        expect(notificationMessage).toEqual('Gathering data...');
      });
    });

    describe('WHEN data is not being gathered', () => {
      it('THEN user does not see notification message', () => {
        const notificationService = TestBed.inject(NotificationService);
        const fixture = TestBed.createComponent(AppComponent);
        (
          Object.getOwnPropertyDescriptor(
            notificationService,
            'gatheringData$'
          )!.get! as any
        ).and.returnValue(new BehaviorSubject<boolean>(false));

        fixture.detectChanges();
        const notificationMessage = fixture.debugElement.query(
          By.css('[data-testing="notification-message"]')
        );

        expect(notificationMessage).toBeNull();
      });
    });
  });
});
