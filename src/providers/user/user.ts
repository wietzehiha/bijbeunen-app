import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

import { CONSTANTS } from '../config/constants';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  url = CONSTANTS.API_DOMEIN + '/user/';

  csrf_token;
  logout_token;
  password;
  email;

  constructor(public http: Http, private storage: Storage) {

  }

  public login(input) {

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With");
      let options = new RequestOptions({ headers: headers });

      let postParams = {
        name: input.email,
        pass: input.password
      };

      let loginUrl = this.url + 'login?_format=json';

      this.http.post(loginUrl, postParams, options)
        .subscribe(res => {
            let data = res.json();

            let currentUser = {
              csrf_token: data.csrf_token,
              logout_token: data.logout_token,
              user: data.current_user,
              email: input.email,
              password: input.password
            };

            if(currentUser) {
              this.storage.set('currentUser', currentUser);
              resolve(true);
            } else {
              console.log('currentUser false');
              resolve(false);
            }

          }, (err) => {
            resolve(false);
          }
        );
    });

  }

  getCachedLoggedUser() {
    return new Promise(resolve => {
      this.storage.get('currentUser').then((val) => {
          this.getUserInfo(val.email, val.password, val.csrf_token, val.user.uid).then(res => {
            if (res) {
              resolve(res);
            } else {
              console.log('error met api ophalen user info');
            }
          });

      });
    });



  }

  public logout() {
    this.storage.get('currentUser').then((val) => {
      if(val.csrf_token) {
        this.csrf_token   = val.csrf_token;
        this.logout_token = val.logout_token;
        this.password     = val.password;
        this.email        = val.email;
      }
    });

    let code = btoa(this.email + this.password);

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('X-CSRF-Token', this.csrf_token);
      headers.append("Authorization", "Basic " + code);
      let options = new RequestOptions({ headers: headers });

      let loginUrl = this.url + 'logout';

      this.storage.set('currentUser', null);
      this.storage.set('LoggedUserInfo', null);
      console.log('uitloggen gelukt.');

      this.http.get(loginUrl, options).map((res: Response) => res.json())
        .subscribe(res => {

          resolve(true);
          }, (err) => {
          console.log(err);
            resolve(false);
          }
        );

    });
  }

  public getUserInfo(email, password, csrf_token, uid) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('X-CSRF-Token', csrf_token);
      let options = new RequestOptions({ headers: headers });

      let loginUrl = this.url + uid + '?_format=json';

      this.http.get(loginUrl, options).map((res: Response) => res.json())
        .subscribe(res => {
          resolve(res);
          }, (err) => {
            console.log(err);
            resolve(false);
          }
        );
    });
  }
}
