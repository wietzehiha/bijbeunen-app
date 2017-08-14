import { Component } from "@angular/core";
import {Http} from "@angular/http";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import { Platform, NavController } from "ionic-angular";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public http: Http, private storage: Storage, public nav: NavController) {
    this.storage.get('currentUser').then((val) => {
      if (!val.csrf_token) {
        this.nav.goToRoot('LoginPage')
      }
    });
  }
}
