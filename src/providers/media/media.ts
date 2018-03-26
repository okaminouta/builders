import {Injectable} from '@angular/core';
import {LoadingController, Platform} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Crop} from '@ionic-native/crop';
import {Base64} from '@ionic-native/base64';
import {DomSanitizer} from '@angular/platform-browser';


@Injectable()
export class MediaProvider {

  public options: any = {
    allowEdit: true,
    sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: this.Camera.MediaType.PICTURE,
    destinationType: this.Camera.DestinationType.FILE_URI
  };

  constructor(public platform: Platform,
              private Camera: Camera,
              private Crop: Crop,
              private base64: Base64,
              public loadingCtrl: LoadingController,
              private sanitizer: DomSanitizer,) {
  }


  getMedia(options: string): Promise<any> {
    if (options === 'camera') {
      this.options.sourceType = this.Camera.PictureSourceType.CAMERA;
    }else {
      this.options.sourceType = this.Camera.PictureSourceType.PHOTOLIBRARY;
    }
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    return this.Camera.getPicture(this.options)
      .then((fileUri) => {
        loader.present();
        // Only giving an android example as ios-native camera has built in cropping ability
        if (this.platform.is('ios')) {
          return fileUri
        } else if (this.platform.is('android')) {
          return this.Crop.crop(fileUri, {quality: 100, targetHeight: 50, targetWidth: 50});
        }
      })
      .then((path) => {
        return path;
      }, (err) => {
        alert(err);
      }).then((path) => {
        return this.base64.encodeFile(path).then((base64File: string) => {
          const sanitizedImg = this.sanitizer.bypassSecurityTrustUrl(base64File);
          loader.dismiss();
          return sanitizedImg;
        })
      })
  }
}
