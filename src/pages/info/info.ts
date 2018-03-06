import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AboutPage} from "../about/about";
import {SliderPage} from "../slider/slider";
import {LoginPage} from "../login/login";
import {HelpPage} from "../help/help";
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {


  constructor(public navCtrl: NavController,
              public user: UserProvider) {

  }

  toAbout () {
    this.navCtrl.push(AboutPage);
  }

  toHelp () {
    this.navCtrl.push(HelpPage);
  }

  logout () {
    this.user.logout();
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
      this.navCtrl.push(LoginPage);
    }
  }



}
