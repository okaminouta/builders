import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavController} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";
import {UtilityProvider} from "../../providers/utility/utility";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {


  editSkills: boolean = false;
  editProfile: boolean = false;
  canLeave = true;
  segmentValue = 'about_me';

  constructor(public navCtrl: NavController,
              private user: UserProvider,
              private util: UtilityProvider) {

  }

  ngOnInit() {
    this.util.changeTabs.subscribe(
      (str) => this.segmentValue = str);
    this.user.firstEnter().get().then((res) => {
      if (res) {
        this.canLeave = false;
        this.editProfile = true;
      }
    });
    this.user.dataChange.subscribe(this.canLeave = true);
  }

  selectedAllSkills() {

  }

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");

  }


  editSkillsFunc() {
    this.editSkills = !this.editSkills;
  }

  editProfileFunc() {

    this.editProfile = !this.editProfile;
    // this.onEditing.emit(this.editProfile);
  }

  // @Output() onEditing = new EventEmitter<boolean>();
}
