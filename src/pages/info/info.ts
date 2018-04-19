import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {AboutPage} from "../about/about";
import {LoginPage} from "../login/login";
import {HelpPage} from "../help/help";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public app: App) {

  }

  toAbout() {
    this.navCtrl.push(AboutPage);
  }

  toHelp() {
    this.navCtrl.push(HelpPage);
  }

  logout() {
    this.app.getRootNavs()[0].setRoot(LoginPage) && this.auth.logout();
  }
}
