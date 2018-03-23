import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";

/**
 * Generated class for the CameraOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-options',
  templateUrl: 'camera-options.html',
})
export class CameraOptionsPage {
  image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public media: MediaProvider,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraOptionsPage');
  }

  imgUpload(option) {
    console.log(option)
    if (option === 'delete') {
      this.image = null;
    } else {+
      this.media.getMedia(option).then((res) => {
        this.image = res;
        this.viewCtrl.dismiss({item: this.image});
      });
    }
    this.viewCtrl.dismiss({item: this.image});

  }

}
