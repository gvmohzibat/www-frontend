import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class LoginService {
  constructor(private rest: Restangular) {}

  getMajors(): any {
    return this.rest.one('major/').get('', {});
  }
  signup(username, password, email, major, sid): any {
    return this.rest.one('sign-up/').post('', {
      client_id: 'm3Wwq1OyC33e4YJTfMP4pHbvz0jeIv7954qf7VVl',
      client_secret: 'WenPPIZPG7L0AOL48OFOxmpQYlc3ebVe1X2JJynUFuYhEfKajUxrPJJ0f2PCyTjmqhQJ9xaobNr7vCNcHKaXFOjuozyvHwnvneS6ZpE1jWlSyC6stCCkKKGMDxzpvVmc',
      grant_type: 'password',
      username,
      password,
      email,
      sid,
      major
    });
  }
}
