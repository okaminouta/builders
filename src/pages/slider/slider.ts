import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SignUpPage} from "../sign-up/sign-up";

/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-slider',
    templateUrl: 'slider.html',
})
export class SliderPage {

    imageURI: any;
    imageURI2: any;
    imageURI3: any;


    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.imageURI = 'assets/icon/dollar-coin.svg';
        this.imageURI2 = 'assets/icon/man-wearing-business-attire-with-suitcase-in-a-city.svg';
        this.imageURI3 = 'assets/icon/businessman-paper-of-the-application-for-a-job.svg';

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SliderPage');
    }

    tolog() {
        this.navCtrl.push(SignUpPage);
    }


}
