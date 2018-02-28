import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UrlProvider} from "../url/url";
import {HttpClientModule} from '@angular/common/http';
import {RequestProvider} from "../request/request";
import 'rxjs/add/operator/toPromise';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor
  (private http: HttpClient,
  private request: RequestProvider,
   private url: UrlProvider) {
    console.log('Hello UserProvider Provider');
  }

  register(data: any) {
    return this.request.post(this.url.signUp, data);

  }
}
