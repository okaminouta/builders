import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  showSearchbar: boolean = false;
    sentence: string = 'friends';


  imageURI:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imageURI = 'assets/imgs/man.png';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  hideSBar () {
    this.showSearchbar = false;
  }

  showSBar () {
    this.showSearchbar = true;
  }

}
