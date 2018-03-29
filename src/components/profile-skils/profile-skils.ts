import {Component, EventEmitter, Input} from '@angular/core';
import {AddSkillPage} from "../../pages/add-skill/add-skill";
import {ModalController, NavController} from "ionic-angular";
import {ContentProvider} from "../../providers/content/content";
import {UserProvider} from "../../providers/user/user";
import {UtilityProvider} from "../../providers/utility/utility";
import {AddSkillModalsPage} from "../../pages/add-skill-modals/add-skill-modals";

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
  registrationIsFinished: boolean;


  constructor(public navCtrl: NavController,
              private util: UtilityProvider,
              public modalCtrl: ModalController,
              public user: UserProvider) {
    this.loadSkills();
    this.user.firstEnter().get().then((data) => {
      if (data === 'Unfinished') {
        this.registrationIsFinished = false;
      } else {
        this.registrationIsFinished = true;
      }
    });
    this.util.userSkills.subscribe(
      () => {
        this.loadSkills();
      });

  }

  changeSkill(skill) {
    let modal = this.modalCtrl.create(AddSkillModalsPage, {item: skill});
    modal.onDidDismiss(data => {
      console.log(data, 'modal data');
      if (data) {
        skill = data;
        this.user.updateSkill(data.item.id, {
          lvl: data.item.lvl
        });
      }
    });
    modal.present()
  }

  goToAddSkill() {
    this.navCtrl.push(AddSkillPage)
  }

  deleteSkills() {
    let skillsToDelete = [];
    this.skillsArr.forEach((item, index) => {
      if (item.checked) {
        skillsToDelete.push(item.id);
        delete this.skillsArr[index];
      }
    });
    console.log({
      skill_id: skillsToDelete
    });
    this.util.quitEdit(false);
    this.user.deleteSkills({
      skill_id: skillsToDelete
    })

  }

  checkSkill(skill) {
    if (skill.checked) {
      skill.checked = !skill.checked;
    } else {
      skill.checked = true;
    }
    console.log(this.skillsArr, 'skills arr')
  }

  loadSkills() {
    this.user.userSkills().then((res => {
      console.log(res, 'user skills');
      this.skillsArr = res;
    }))
  }

}
