import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { BurgerJointsFacadeService } from '../../domain/burger-joints-facade.service';

@Component({
  selector: 'venues-burger-joints-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './burger-joints-map.component.html',
  styleUrl: './burger-joints-map.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BurgerJointsMapComponent {
  facade = inject(BurgerJointsFacadeService);
  centerPoint = { lat: 58.378, lng: 26.7321 };
  circleOptions = {
    strokeColor: 'black',
    strokeWeight: 1,
    fillOpacity: 0,
  };
  options: google.maps.MapOptions = {
    center: this.centerPoint,
    zoom: 13,
  };
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  info: string = '';

  openInfo(marker: MapMarker, content: any) {
    this.info = content;
    this.infoWindow.open(marker);
  }
}
