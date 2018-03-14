import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  segmentValue: string = 'about_me';
  editSkills: boolean = false;
  editProfile: boolean = false;

  constructor() {

  }

  selectedAllSkills() {

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
