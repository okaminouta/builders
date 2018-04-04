import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneContactsPage } from './phone-contacts';

@NgModule({
  declarations: [
    PhoneContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneContactsPage),
  ],
})
export class PhoneContactsPageModule {}
