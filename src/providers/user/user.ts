import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

  constructor() {
    console.log('Hello UserProvider Provider');
  }

  public login(input) {

    let loginUrl = this.url + 'login';

    console.log(loginUrl);
    console.log(input);


    let data = ''

    return data;

  }

}
