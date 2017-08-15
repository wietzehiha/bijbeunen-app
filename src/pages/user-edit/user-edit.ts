import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UserEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage implements OnInit{

  titleForm;
  userLogin = {
    email: '',
    password: '',
    password_h: ''
  };

  form;

  loginform;

  loginForm     = false;
  personalForm  = false;
  bijbeunForm   = false;
  beunbaasForm  = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage) {
    this.storage.get('currentUser').then((val) => {
      this.userLogin.email = val.email;
    });

  }

  ngOnInit(){
    this.form = this.navParams.get('form');

    if (this.form == 'login') {
      this.loginForm = true;
    } else if (this.form == 'personal') {
      this.personalForm = true;
    } else if (this.form == 'bijbeunen') {
      this.bijbeunForm = true;
    } else if (this.form == 'beunbaas') {
      this.beunbaasForm = true;
    }
  };
}


