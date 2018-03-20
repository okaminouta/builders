import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import { Crop } from '@ionic-native/crop';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  public options: any = {
    allowEdit: true,
    sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: this.Camera.MediaType.PICTURE,
    destinationType: this.Camera.DestinationType.FILE_URI
  }

  constructor(public platform: Platform,
              private Camera: Camera,
              private Crop: Crop) {}


  // Return a promise to catch errors while loading image
  getMedia(): Promise<any> {
    // Get Image from ionic-native's built in camera plugin
    return this.Camera.getPicture(this.options)
      .then((fileUri) => {
        // Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
        // Only giving an android example as ionic-native camera has built in cropping ability
        if (this.platform.is('ios')) {
          return fileUri
        } else if (this.platform.is('android')) {
          // Modify fileUri format, may not always be necessary
          // fileUri = 'file://' + fileUri;

          /* Using cordova-plugin-crop starts here */
          return this.Crop.crop(fileUri, { quality: 100, targetHeight: 50, targetWidth: 50 });
        }
      })
      .then((path) => {
        // path looks like 'file:///storage/emulated/0/Android/data/com.foo.bar/cache/1477008080626-cropped.jpg?1477008106566'
        alert('Cropped Image Path!: ' + path);
        return path;
      })
  }

}
