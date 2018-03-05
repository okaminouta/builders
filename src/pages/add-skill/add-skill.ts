import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

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

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddSkillPage');
    }

    goBack() {
        this.navCtrl.pop();
    }

    skillSelectorPopap() {
        let prompt = this.alertCtrl.create({
            title: 'Login',
            message: "<ion-item>\n" +
            "    <ion-label>step=100, snaps, </ion-label>\n" +
            "    <ion-range min=\"1000\" max=\"2000\" step=\"100\" snaps=\"true\" color=\"secondary\" [(ngModel)]=\"singleValue4\"></ion-range>\n" +
            "  </ion-item>",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: data => {
                        console.log('Saved clicked');
                        this.navCtrl.push(TabsPage);
                    }
                }
            ]
        });
        prompt.present();
    }
}
