import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

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
      var headers = new Headers();
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

            let userInfo = this.getUserInfo(input.email, input.password, data.csrf_token, data.current_user.id);

            if(currentUser) {
              this.storage.set('currentUser', currentUser);
            }

            resolve(true);

          }, (err) => {
            resolve(false);
          }
        );
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
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('X-CSRF-Token', this.csrf_token);
      headers.append("Authorization", "Basic " + code);
      let options = new RequestOptions({ headers: headers });

      let loginUrl = this.url + '/user/logout?_format=json';

      this.http.get(loginUrl, options)
        .subscribe(res => {
          this.storage.remove('currentUser').then(() => {
            console.log('Logged out');
          });
          }, (err) => {
          console.log(err);
            resolve(false);
          }
        );

    });
  }

  public getUserInfo(email, password, csrf_token, uid) {

    let code = btoa(this.email + this.password);

    return new Promise(resolve => {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('X-CSRF-Token', this.csrf_token);
      headers.append("Authorization", "Basic " + code);
      let options = new RequestOptions({ headers: headers });

      let loginUrl = this.url + '/user/' + uid + '?_format=json';

      this.http.get(loginUrl, options)
        .subscribe(res => {
          console.log(res);
          }, (err) => {
            console.log(err);
            resolve(false);
          }
        );
    });
  }
}
