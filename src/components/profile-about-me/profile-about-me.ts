import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {ModalController, NavController} from "ionic-angular";

import {ChangePassPage} from "../../pages/change-pass/change-pass";
import {UtilityProvider} from "../../providers/utility/utility";
import {UserProvider} from "../../providers/user/user";
import {MediaProvider} from "../../providers/media/media";
import {AddSkillModalsPage} from "../../pages/add-skill-modals/add-skill-modals";
import {CameraOptions} from "@ionic-native/camera";
import {CameraOptionsPage} from "../../pages/camera-options/camera-options";
import {CommunicationProvider} from "../../providers/communication/communication ";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContentProvider} from "../../providers/content/content";


@Component({
  selector: 'profile-about-me',
  templateUrl: 'profile-about-me.html'
})
export class ProfileAboutMeComponent implements OnChanges {
  @Input() editProfile;
  segmentValue;
  userData: any;
  city: string;
  imageURI: any = null;
  phone;


  showList: boolean = false;
  searchQuery: string = '';
  items: string[];
  defaultImg: string;
  loadedImg;

  constructor(public navCtrl: NavController,
              public util: UtilityProvider,
              public modalCtrl: ModalController,
              public content: ContentProvider,
              private comm: CommunicationProvider,
              private user: UserProvider,
              private media: MediaProvider,) {
    this.initializeItems();
    this.defaultImg = 'assets/imgs/camera.png';
    user.getUser().then((res)=>{
      if (res) {
        this.userData = res.profile;
        this.phone = res.phone;
        if (res.photo_path != null) {
          this.loadedImg = res.photo_path;
        }
      }
      this.leaveCheck();
    })
  }

  leaveCheck() {
    if (this.userData.first_name === null ||
      this.userData.last_name === null ||
      this.userData.first_name.trim() === '' ||
      this.userData.last_name.trim() === ''
    ) {
      this.util.toast("Заповніть обов'язкові данні профіля", 'alert')
      return false;
    } else return true;
  }

  photoAddControl() {
    let modal = this.modalCtrl.create(CameraOptionsPage);
    modal.onDidDismiss((data) => {
      if (data === 'delete') {
        this.imageURI = undefined;
        this.loadedImg = undefined;
      } else {
        this.media.getMedia(data).then((res) => {
          this.imageURI = res;
        });
      }
    });
    modal.present()
  }

  validateEmail(email) {
    let validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (!changes.editProfile.firstChange &&
      !this.editProfile &&
      this.validateEmail(this.userData.email)) {
      if (this.leaveCheck()) {
        if (this.imageURI) {
          this.userData.photo = this.imageURI;
        }
        if (this.defaultImg && !this.imageURI && !this.loadedImg) {
          this.userData.photo = null;
        }
        this.user.setProfile(this.userData).subscribe((res) => {
        });
        this.user.firstEnter().get().then((res) => {
          if (res && res === 'Unfinished') {
            this.util.toast('Заповніть вашы навички', 'alert');
            this.comm.changeTab('skills');
          }
        })
      }else this.comm.changeProfileEdit(true)
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
      email: '',
      city: null,
      passport_id: false,
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
