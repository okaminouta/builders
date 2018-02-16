import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {LoginPage} from "../../pages/login/login";

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  text: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
  }
  logout () {

    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
      this.navCtrl.push(LoginPage);
    }
  }

}
