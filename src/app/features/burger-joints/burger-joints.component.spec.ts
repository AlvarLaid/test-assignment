import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BurgerJointsComponent } from './burger-joints.component';
import { BurgerJointPlacesResponseBody } from './model/burger-joints.model';
import { BurgerJointsMapComponent } from './ui/burger-joints-map/burger-joints-map.component';

@Component({
  selector: 'venues-burger-joints-map',
  template: '',
  standalone: true,
})
export class BurgerJointsMapComponentMock {}

describe('BurgerJointsComponent', () => {
  let fixture: ComponentFixture<BurgerJointsComponent>;
  let httpTestingController: HttpTestingController;
  const burgerJointRequestUrl: Readonly<string> =
    'https://api.foursquare.com/v3/places/search?categories=13031&fields=fsq_id,geocodes,name,photos,distance&limit=50&ll=58.3780,26.7321&radius=5500';

  beforeEach(async () => {
    console.log('running');
    await TestBed.configureTestingModule({
      imports: [BurgerJointsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .overrideComponent(BurgerJointsComponent, {
        remove: {
          imports: [BurgerJointsMapComponent],
        },
        add: {
          imports: [BurgerJointsMapComponentMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BurgerJointsComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should fetch burger joints', () => {
    const req = httpTestingController.expectOne(burgerJointRequestUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(getBurgerJointRequestResponseBody());
  });
});

function getBurgerJointRequestResponseBody(): BurgerJointPlacesResponseBody {
  return {
    results: [
      {
        fsq_id: '5048f68be4b0491500fe499b',
        distance: 219,
        geocodes: {
          main: {
            latitude: 58.376307,
            longitude: 26.730145,
          },
        },
        name: 'Liivi Villa',
        photos: [],
      },
      {
        fsq_id: '4c695ede8e7c0f479f62df0f',
        distance: 1001,
        geocodes: {
          main: {
            latitude: 58.376354,
            longitude: 26.728813,
          },
        },
        name: 'Kähkukas',
        photos: [
          {
            id: '5dcaadb70c424100080612ba',
            created_at: '2019-11-12T13:03:51.000Z',
            prefix: 'https://fastly.4sqi.net/img/general/',
            suffix:
              '/569209749_WLWJYQ9hKnFjYzWmDvpkodIiLzxQulzo9bN_DpJ_RwQ.jpg',
            width: 1439,
            height: 1446,
          },
        ],
      },
      {
        fsq_id: '5f86e41f0003d21d16dcdda9',
        distance: 298,
        geocodes: {
          main: {
            latitude: 58.37784,
            longitude: 26.726993,
          },
        },
        name: 'Viru Burger',
        photos: [],
      },
      {
        fsq_id: '500197efe4b07ecf510fc992',
        distance: 343,
        geocodes: {
          main: {
            latitude: 58.376695,
            longitude: 26.726762,
          },
        },
        name: 'õimu päevade terrass',
        photos: [
          {
            id: '60e8656bb165f5769774830d',
            created_at: '2021-07-09T15:04:11.000Z',
            prefix: 'https://fastly.4sqi.net/img/general/',
            suffix: '/32630353_M8qYhC5nKus9G-GxFy8G84fe7hcm26a6TiwKBzaWtNE.jpg',
            width: 1920,
            height: 1440,
          },
          {
            id: '60e8656aa8f8795d81a9c236',
            created_at: '2021-07-09T15:04:10.000Z',
            prefix: 'https://fastly.4sqi.net/img/general/',
            suffix: '/32630353_0n6ZOQ8KC0f3MLPppeWuP1c5TyL5thS2j5-OnTEkmVs.jpg',
            width: 1920,
            height: 1440,
          },
          {
            id: '501c36bbe4b082507fa3a7ac',
            created_at: '2012-08-03T20:38:19.000Z',
            prefix: 'https://fastly.4sqi.net/img/general/',
            suffix: '/LDo3C6JgBXEgZWoL8wBgUcjOl91xo9aR-C4RFiptmcU.jpg',
            width: 405,
            height: 540,
          },
          {
            id: '50019b66e4b0095177e432b8',
            created_at: '2012-07-14T16:16:38.000Z',
            prefix: 'https://fastly.4sqi.net/img/general/',
            suffix: '/OEVvb-QS0z5T2oM8uYKWTDSvFZBHH7xZSEZhnUA3Dxg.jpg',
            width: 540,
            height: 720,
          },
        ],
      },
    ],
    context: {} as any,
  };
}
