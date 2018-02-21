import {Component, ElementRef, HostBinding} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  // @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private elRef: ElementRef) {
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad SignUpPage');
  }

  tolog () {
    // console.log(this.backgroundColor)
    // this.navCtrl.push(LoginPage);
    let styles = getComputedStyle(this.elRef.nativeElement);
    // styles['background-image'] = "../assets/imgs/logo.png";
    console.log(styles['background-image']);
  }

  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "../assets/imgs/logo.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "../assets/imgs/logo.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "../assets/imgs/logo.png",
    }
  ];

}
