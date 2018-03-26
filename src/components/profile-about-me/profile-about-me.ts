import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {ModalController, NavController} from "ionic-angular";

import {ChangePassPage} from "../../pages/change-pass/change-pass";
import {UtilityProvider} from "../../providers/utility/utility";
import {UserProvider} from "../../providers/user/user";
import {MediaProvider} from "../../providers/media/media";
import {AddSkillModalsPage} from "../../pages/add-skill-modals/add-skill-modals";
import {CameraOptions} from "@ionic-native/camera";
import {CameraOptionsPage} from "../../pages/camera-options/camera-options";


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
  phone;

  // disableFields: boolean = true;

  showList: boolean = false;
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController,
              public util: UtilityProvider,
              public modalCtrl: ModalController,
              private user: UserProvider,
              private media: MediaProvider,) {
    this.initializeItems();
    this.leaveCheck();
    this.imageURI = 'assets/imgs/camera.png';
    this.user.getProfile().then(res => {
      if (res) {
        this.userData.first_name = res.profile.first_name;
        this.userData.last_name = res.profile.last_name;
        this.userData.email = res.profile.email;
        this.userData.city = res.profile.city;
        this.userData.passport_id = res.profile.passport_id;
        this.phone = '+380 ' +
          res.profile.phone.toString().substring(0, 2) +
          ' ' + res.profile.phone.toString().substring(2, 4) +
          ' ' + res.profile.phone.toString().substring(4, 6) +
          ' ' + res.profile.phone.toString().substring(6);
        this.imageURI = res.photo_path;
      }
    });

  }

  leaveCheck() {
    if (this.userData.first_name === null || this.userData.last_name === null) {
      this.util.toast('Заповніть данні профіля', 'alert')
    }
  }

  photoAddControl() {
    let modal = this.modalCtrl.create(CameraOptionsPage);
    modal.onDidDismiss((data) => {
      if (data === 'delete') {
        this.imageURI = 'assets/imgs/camera.png';
      } else {
        this.media.getMedia(data).then((res) => {
          this.imageURI = res;
        });
      }
    });
    modal.present()
  }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (!changes.editProfile.firstChange && !this.editProfile) {
      console.log(this.userData)
      this.user.setProfile(this.userData);
      this.user.firstEnter().get().then((res) => {
        if (res) {
          this.util.toast('Заповніть вашы навички', 'alert');
          this.util.changeTab('skills');
        }
      })
    }
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
      photo: this.imageURI || null
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
