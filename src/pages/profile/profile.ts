import {Component} from '@angular/core';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    segmentValue: string = 'about_me';
    editSkills: boolean = false;

    constructor() {

    }

    selectedAllSkills() {

    }

    editSkillsFunc() {
        this.editSkills = !this.editSkills;
    }
}
