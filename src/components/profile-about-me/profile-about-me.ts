import {Component, Input,OnChanges, SimpleChange} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {LoadingController, NavController, ToastController} from "ionic-angular";
import {ChangePassPage} from "../../pages/change-pass/change-pass";
import {UtilityProvider} from "../../providers/utility/utility";
import {UserProvider} from "../../providers/user/user";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'profile-about-me',
  templateUrl: 'profile-about-me.html'
})
export class ProfileAboutMeComponent implements OnChanges {
  @Input() editProfile;
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
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    this.initializeItems();
    if (this.userData.name === null || this.userData.surname === null) {
      this.util.toast('Заповніть данні профіля', 'alert')
    }
    this.imageURI = 'assets/imgs/camera.png';
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (!changes.editProfile.firstChange && !this.editProfile){
      this.user.setProfile(this.userData)
    }

  }

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,' + imageData;

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

  updateProfile () {
    console.log(this.userData)
    this.user.setProfile(this.userData).then((res) => {
      console.log(res, 'updateProfile res')
    })
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
