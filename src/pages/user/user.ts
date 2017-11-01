import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import { Storage } from '@ionic/storage';

import { UserEditPage } from "../user-edit/user-edit"

/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit {

  user;
  uid;
  name;
  roles;
  userInfo;

  voornaam;
  achternaam;
  tussen;

  age;
  email;
  geslacht;

  photo;

  vollenaam;


  constructor(public nav: NavController, public navParams: NavParams, public userPro: UserProvider, public storage: Storage) {
    this.storage.get('currentUser').then((val) => {
      if (val.csrf_token) {
        console.log(val);
        this.user = val.user;
        this.uid = val.uid;
        this.name = val.user.name;
        this.roles = val.user.roles;
        console.log(this.user);
      }
    });

  }

  ngOnInit(){
    this.getUsers();
  };

  getUsers(){
    this.userPro.getCachedLoggedUser().then(user =>  {
      this.userInfo = user;
      var obj = this.userInfo;

      this.name = obj['name'][0].value;
      this.email = obj['mail'][0].value;
      this.voornaam = obj['field_voornaam'][0].value;
      this.achternaam = obj['field_achternaam'][0].value;
      // TODO: tussen voegesel fixen.
      // if (obj['tussenvoegsel'][0]) {
      //   this.tussen = obj['tussenvoegsel'][0].value;
      // }
      this.age = obj['field_age'][0].value;
      this.geslacht = obj['field_geslacht'][0].value;
      this.photo = obj['user_picture'][0].url;

      this.vollenaam = this.voornaam + ' ' + this.achternaam;
    });
  }

  // openEditUserPage() {
  //   this.nav.push(UserEditPage);
  // }

  openEditPhoto() {
    this.nav.push(UserEditPage, {
      form: "photo"
    });
  }

  openEditLogin() {
    this.nav.push(UserEditPage, {
        form: "login"
    });
  }

  openEditPersonal() {
    this.nav.push(UserEditPage, {
      form: "personal"
    });
  }

  openEditBijbeuner() {
    this.nav.push(UserEditPage, {
      form: "bijbeuner"
    });
  }

  openEditBeunbaas() {
    this.nav.push(UserEditPage, {
      form: "beunbaas"
    });
  }
}
