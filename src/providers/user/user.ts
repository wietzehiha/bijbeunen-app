import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';

import { CONSTANTS } from '../config/constants';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  url = CONSTANTS.API_DOMEIN + '/user/';

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

      console.log(loginUrl);

      this.http.post(loginUrl, postParams, options)
        .subscribe(res => {
            let data = res.json();

            let currentUser = {
              csrf_token: data.csrf_token,
              logout_token: data.logout_token,
              user: data.current_user
            };

            if(currentUser) {
              this.storage.set('currentUser', currentUser);
            }

            resolve(true);
          console.log('good');

          }, (err) => {
          console.log('error');
            resolve(false);
          }
        );
    });

  }

  logout() {
    //ToDo: Logout maken.
  }


}
