import {Component, OnInit} from '@angular/core';
import {NavController} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";
import {CommunicationProvider} from "../../providers/communication/communication ";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  editSkills  = false;
  editProfile  = false;
  allSkills = false;
  canLeave = true;
  segmentValue = 'about_me';

  constructor(public navCtrl: NavController,
              private user: UserProvider,
              private comm: CommunicationProvider) {

  }

  ngOnInit() {
    this.comm.changeTabs.subscribe(
      (str) => {
        this.segmentValue = str
      });
    this.comm.quitEditing.subscribe(
      (val) => {
        this.editSkills = val;
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

  editSkillsFunc() {
    this.allSkills = false;
    this.editSkills = !this.editSkills;
  }

  editProfileFunc() {
    this.editProfile = !this.editProfile;
  }

}
