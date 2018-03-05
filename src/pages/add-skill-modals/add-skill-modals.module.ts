import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSkillModalsPage } from './add-skill-modals';

@NgModule({
  declarations: [
    AddSkillModalsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSkillModalsPage),
  ],
})
export class AddSkillModalsPageModule {}
