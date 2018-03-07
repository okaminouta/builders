import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import {InfoPage} from "../info/info";
import {ChangePassPage} from "../change-pass/change-pass";
import {AddSkillPage} from "../add-skill/add-skill";
import {FileTransfer} from "@ionic-native/file-transfer";
import {Camera, CameraOptions} from "@ionic-native/camera";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
    sentence: string = 'about_me';
  city: string;
  imageURI:any;
  imageFileName:any;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private transfer: FileTransfer,
              private camera: Camera,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    this.initializeItems();
    this.imageURI = 'assets/imgs/camera.png';

  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      // this.presentToast(err);
    });
  }

  presentContactModal() {
    this.navCtrl.push(ChangePassPage);

  }

  showList: boolean = false;
  searchQuery: string = '';
  items: string[];

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Berlin',
      'Bueno Aires',
      'Madrid',
      'Paris'
    ];
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

    editSkills: boolean = false;

    selectedAllSkills() {

    }

    editSkillsFunc() {
        this.editSkills = !this.editSkills;
    }


}
