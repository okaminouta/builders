import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {SignUpPage} from "../sign-up/sign-up";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  toReg() {
    this.navCtrl.push(SignUpPage);

    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }

}
