import {Component, Input,OnChanges, SimpleChange} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {ChangePassPage} from "../../pages/change-pass/change-pass";
import {UtilityProvider} from "../../providers/utility/utility";
import {UserProvider} from "../../providers/user/user";
import { Crop } from '@ionic-native/crop';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {MediaProvider} from "../../providers/media/media";

@Component({
  selector: 'profile-about-me',
  templateUrl: 'profile-about-me.html'
})
export class ProfileAboutMeComponent implements OnChanges {
  @Input() editProfile;
  segmentValue;
  userData: any;
  city: string;
  imageURI: any;
  imageFileName: any;
  // disableFields: boolean = true;

  showList: boolean = false;
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController,
              public util: UtilityProvider,
              private user: UserProvider,
              private transfer: FileTransfer,
              private camera: Camera,
              private crop: Crop,
              private media: MediaProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    this.initializeItems();
    this.leaveCheck();
    this.imageURI = 'assets/imgs/camera.png';
  }

  leaveCheck(){
    if (this.userData.first_name === null || this.userData.last_name === null) {
      this.util.toast('Заповніть данні профіля', 'alert')
    }
  }

  testImg;
  test () {
    alert('123 ');
    this.testImg = this.media.getMedia();
  }

  // resize(base64Img, width, height) {
  //   let img = new Image();
  //   img.src = base64Img;
  //   let canvas = document.createElement('canvas'),ctx = canvas.getContext('2d');
  //   canvas.width = width;
  //   canvas.height = height;
  //   ctx.drawImage(img, 0, 0, width, height);
  //   return canvas.toDataURL("image/jpeg");
  // }




  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (!changes.editProfile.firstChange && !this.editProfile){
      this.user.setProfile(this.userData)
      this.user.firstEnter().get().then((res) => {
        if(res){
          this.util.toast('Заповніть вашы навички', 'alert');
          this.util.changeTab('skills');

        }
      })

    }

  }


  toBase64(url: string) {
    return new Promise<string>(function (resolve) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function () {
        let reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    });
  }
  base64Image: any;
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,' + imageData;
      this.crop.crop(this.imageURI, {quality: 75, targetHeight: 50, targetWidth: 50})
        .then(
          newImage => {
            console.log('new image path is: ' + newImage);
            this.toBase64(newImage).then((base64Img) => {
              this.base64Image = base64Img;
            });

          },
          error => console.error('Error cropping image', error)
        );

    }, (err) => {

      console.log(err);
      // this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    loader.dismiss();

  }



  presentContactModal() {
    this.navCtrl.push(ChangePassPage);

  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Berlin',
      'Bueno Aires',
      'Madrid',
      'Paris'
    ];
    this.userData = {
      first_name: null,
      last_name: null,
      email: null,
      city: null,
      passport_id: false,
      first_name_ENG: null,
      last_name_ENG: null,
      photo: this.imageURI
    }
  }

  chooseItem(item) {
    this.city = item;
    this.showList = false;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      // Filter the items
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      // Show the results
      this.showList = true;
    } else {

      // hide the results when the query is empty
      this.showList = false;
    }
  }


}
