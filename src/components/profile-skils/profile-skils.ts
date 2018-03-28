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
  registrationIsFinished: boolean;


  constructor(public navCtrl: NavController,
              public user: UserProvider) {
    this.user.userSkills().then( (res => {
      console.log(res,'user skills');
      this.skillsArr = res;
    }))
    this.user.firstEnter().get().then((data)=>{
      if(data === 'Unfinished'){
        this.registrationIsFinished = false;
      } else {
        this.registrationIsFinished = true;
      }
    });

  }

  goToAddSkill() {
    this.navCtrl.push(AddSkillPage)
  }

  deleteSkills() {
    let skillsToDelete = [];
    this.skillsArr.forEach((item)=> {
      if(item.checked){
        skillsToDelete.push(item.id);
      }
    });
    console.log(skillsToDelete);
    this.user.deleteSkills({
      skill_id: skillsToDelete
    });
  }

  checkSkill(skill) {
    if(skill.checked){
      skill.checked = !skill.checked;
    } else {
      skill.checked = true;
    }
    console.log(this.skillsArr,'skills arr')
  }

}
