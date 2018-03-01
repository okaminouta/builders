import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UrlProvider} from "../url/url";
import {HttpClientModule} from '@angular/common/http';
import {RequestProvider} from "../request/request";
import 'rxjs/add/operator/toPromise';
import { ToastController } from 'ionic-angular';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

    constructor(private http: HttpClient,
                private request: RequestProvider,
                private url: UrlProvider,
                public toastCtrl: ToastController) {
        console.log('Hello UserProvider Provider');
    }

    register(data: any) {
        return this.request.post(this.url.signUp, data);

    }

    login(data: any) {
        return this.request.post(this.url.signIn, data);

    }

    credentialsCheck(data: any) {
        let toast = this.toastCtrl.create({
            message: 'Check input',
            position: 'middle',
            duration: 3000
        });
        if (data.phone.length !== 9) {
            console.log('failed 1')
            toast.present();
            return false;

        }
        if (data.password.length < 6 || data.password.length > 15) {
            console.log('failed 2')
            return false;
        }
        return true;
    }
}
