import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {AddSkillModalsPage} from "../add-skill-modals/add-skill-modals";

/**
 * Generated class for the AddSkillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-skill',
    templateUrl: 'add-skill.html',
})
export class AddSkillPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController) {
    }

    // ionViewDidLoad() {
    //     console.log('ionViewDidLoad AddSkillPage');
    // }

    goBack() {
        this.navCtrl.pop();
    }

    skillSelectorPopap() {
        let modal = this.modalCtrl.create(AddSkillModalsPage, {userId: 8675309});
        modal.present();
    }
}