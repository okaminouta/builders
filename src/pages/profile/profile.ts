import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavController} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";
import {UtilityProvider} from "../../providers/utility/utility";
import {CommunicationProvider} from "../../providers/communication/communication ";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {


  editSkills: boolean = false;
  editProfile: boolean = false;
  allSkills: boolean = false;
  canLeave = true;
  segmentValue = 'about_me';

  constructor(public navCtrl: NavController,
              private user: UserProvider,
              private comm: CommunicationProvider,
              private util: UtilityProvider) {

  }

  ngOnInit() {
    this.util.changeTabs.subscribe(
      (str) => {
        this.segmentValue = str
      });
    this.util.quitEditing.subscribe(
      (val) => {
        this.editSkills = val;
        // this.editSkillsFunc()
      });
    this.user.firstEnter().get().then((res) => {
      if (res && res === 'Unfinished') {
        this.canLeave = false;
        this.editProfile = true;
      }
    });
    this.comm.profileEdit.subscribe(
      (val) => {
        setTimeout(() => this.editProfile = val, 0)
      });
    this.user.dataChange.subscribe(this.canLeave = true);
  }

  selectedAllSkills() {
    this.allSkills = true;
  }

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");

  }


  editSkillsFunc() {
    this.allSkills = false;
    this.editSkills = !this.editSkills;
  }

  editProfileFunc() {
    this.editProfile = !this.editProfile;
    // this.onEditing.emit(this.editProfile);
  }

  // @Output() onEditing = new EventEmitter<boolean>();
}
