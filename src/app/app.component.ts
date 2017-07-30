import { Component } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CONSTANTS } from '../providers/config/constants';
import { Http, Headers, RequestOptions } from '@angular/http';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public http: Http) {

    this.testApi().then(data => {
      if(data == 200) {
        platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
        });

      } else if(data == 400) {
        //ToDo: Error melding verwerken.
      } else {
        //ToDo: Error melding verwerken.
      }
    });
  }

  testApi() {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(CONSTANTS.API_DOMEIN + '?format=json', {
          headers: headers
        })
        .subscribe(response => {
          console.log('200');
          resolve(200);
        }, error => {
          console.log('400');
          resolve(400);
        });
    });
  }
}

