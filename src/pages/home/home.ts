import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Platform, NavController } from "ionic-angular";

import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  lati;
  long;

  constructor(
    private googleMaps: GoogleMaps,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public http: Http,
    public nav: NavController,
    private geolocation: Geolocation) {

    this.loadMap();
  }

  // Load map only after view is initialized
  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {

      let element: HTMLElement = document.getElementById('map');

      let map: GoogleMap = this.googleMaps.create(element);

      // listen to MAP_READY event
      // You must wait for this event to fire before adding something to the map or modifying it in anyway
      map.one(GoogleMapsEvent.MAP_READY).then(
        () => {
          console.log('Map is ready!');
          // Now you can add elements to the map like the marker
        }
      );

    // create CameraPosition
    let position: CameraPosition = {
      target: {
        lat: 51.916654,
        lng: 4.473276
      },
      zoom: 14,
      tilt: 20
    };

    // move the map's camera to position
    map.moveCamera(position);


  }


}
