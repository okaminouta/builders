import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecoverPassPage } from './recover-pass';

@NgModule({
  declarations: [
    RecoverPassPage,
  ],
  imports: [
    IonicPageModule.forChild(RecoverPassPage),
  ],
})
export class RecoverPassPageModule {}
