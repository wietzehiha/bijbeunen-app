import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  input = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public userpro: UserProvider) {

  }

  logForm() {
    let output = this.userpro.login(this.input);

    console.log(output);
  }

}
