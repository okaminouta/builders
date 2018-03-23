import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraOptionsPage } from './camera-options';

@NgModule({
  declarations: [
    CameraOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraOptionsPage),
  ],
})
export class CameraOptionsPageModule {}
