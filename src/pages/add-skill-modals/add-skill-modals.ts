import {Component, Renderer} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the AddSkillModalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-skill-modals',
  templateUrl: 'add-skill-modals.html',
})
export class AddSkillModalsPage {
  skill: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public renderer: Renderer,
              public viewCtrl: ViewController) {

    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
    console.log('item', navParams.get('item'));
    this.skill = navParams.get('item')
  }

  skilLavel = 1;
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AddSkillModalsPage');
  // }
  cancel() {
    this.viewCtrl.dismiss()
  }

  save() {
    this.skill.level = this.skilLavel;
    this.skill.checked = true;
    this.viewCtrl.dismiss({item: this.skill});
  }
}
