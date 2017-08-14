import { Component, ViewChild } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CONSTANTS } from '../providers/config/constants';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';

import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public http: Http, private storage: Storage, public user: UserProvider) {
    this.storage.get('currentUser').then((val) => {
      console.log(val);
      if(val != null) {
        console.log(val.csrf_token);
        this.rootPage = HomePage;
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: UserPage },
      { title: 'Logout', component: null }
    ];

    this.testApi().then(data => {
      if(data == 200) {
        this.initializeApp();

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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == null) {
      this.user.logout();
      this.nav.setRoot(LoginPage);
    } else {
      this.nav.setRoot(page.component);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

