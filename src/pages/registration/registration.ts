import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {UserProvider} from '../../providers/user/user';
import {HomePage} from "../home/home";

/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  private input: FormGroup;

  constructor(public navController: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public userpro: UserProvider,public alertCtrl: AlertController) {
    this.input = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  registrationForm() {

    this.userpro.registration(this.input).then(data => {
      console.log('true or false');
      console.log(data);
      if (data) {
        this.navController.setRoot(HomePage);
      } else {
        this.showAlert('Geen toegang', 'Uw ingevulde gegevens zijn niet correct', 'OK');
        this.input = this.formBuilder.group({
          email: [''],
          password: [''],
        });
      }
    });
  }

  showAlert(title, subtitle, button) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [button]
    });
    alert.present();
  }
}
