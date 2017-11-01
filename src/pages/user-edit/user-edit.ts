import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";

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

  userLogin = {
    email: '',
    password: '',
    password_h: ''
  };

  userPersonal = {
    voornaam: '',
    tussen: '',
    achternaam: '',
    age: '',
    geslacht: '',
    photo: ''
  };

  form;

  loginForm     = false;
  personalForm  = false;
  bijbeunForm   = false;
  beunbaasForm  = false;
  photoForm     = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage, public userPro: UserProvider) {
    this.userPro.getCachedLoggedUser().then(user =>  {
      var obj = user;
      this.userLogin.email = obj['mail'][0].value;
      this.userPersonal.voornaam = obj['field_voornaam'][0].value;
      this.userPersonal.achternaam = obj['field_achternaam'][0].value;
      this.userPersonal.age = obj['field_age'][0].value;
      this.userPersonal.geslacht = obj['field_geslacht'][0].value;
      this.userPersonal.photo = obj['user_picture'][0].url;
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
    } else if (this.form == 'photo') {
      this.photoForm = true;
    }
  };
}


