import {Component, Input} from '@angular/core';
import {AddSkillPage} from "../../pages/add-skill/add-skill";
import {NavController} from "ionic-angular";

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

    constructor(public navCtrl: NavController) {

    }

    goToAddSkill() {
        this.navCtrl.push(AddSkillPage)
    }

}
