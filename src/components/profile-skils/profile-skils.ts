import {Component, Input} from '@angular/core';
import {AddSkillPage} from "../../pages/add-skill/add-skill";
import {NavController} from "ionic-angular";
import {ContentProvider} from "../../providers/content/content";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the ProfileSkilsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-skills',
  templateUrl: 'profile-skils.html'
})
export class ProfileSkilsComponent {
  @Input() editSkills;
  skillsArr = [];

  constructor(public navCtrl: NavController,
              public user: UserProvider) {
    this.user.userSkills().then( (res => {
      console.log(res,'user skills');
      this.skillsArr = res;
    }))

  }

  goToAddSkill() {
    this.navCtrl.push(AddSkillPage)
  }
}
