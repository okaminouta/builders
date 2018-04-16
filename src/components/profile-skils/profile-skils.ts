import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, SimpleChange} from '@angular/core';
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
export class ProfileSkilsComponent implements OnChanges {
  @Input() editSkills;
  @Input() allSkills;
  skillsArr = [];
  registrationIsFinished: boolean;


  constructor(public navCtrl: NavController,
              private util: UtilityProvider,
              private ref: ChangeDetectorRef,
              public modalCtrl: ModalController,
              public user: UserProvider) {
    this.loadSkills();
    this.user.firstEnter().get().then((data) => {
      this.registrationIsFinished = data !== 'Unfinished';
    });
    this.util.userSkills.subscribe(
      () => {
        this.loadSkills();
      });

  }

  changeSkill(skill) {
    let skillPreserver = Object.assign({}, skill);
    let modal = this.modalCtrl.create(AddSkillModalsPage, {item: skillPreserver});
    modal.onDidDismiss(data => {
      console.log(data, 'modal data');
      if (data) {
        data.item.checked = false;
        this.skillsArr[this.skillsArr.indexOf(skill)] = data.item;
        this.user.updateSkill(data.item.id, {
          lvl: data.item.lvl
        });
      }
    });
    modal.present()
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.allSkills) this.skillsArr.forEach(skill => skill.checked = true);
    if (!this.editSkills) this.skillsArr.forEach((skill) => skill.checked = false);
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
    this.util.quitEdit(false);
    debugger
    this.user.deleteSkills({
      skill_id: skillsToDelete
    })

  }

  checkSkill(skill) {
    skill.checked = !skill.checked;
    console.log(skill)
  }

  loadSkills() {
    this.user.userSkills().subscribe((res: any[]) => {
      console.log(res, 'user skills');
      this.skillsArr = res;
    })
  }

}
