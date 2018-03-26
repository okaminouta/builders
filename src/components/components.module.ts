import {NgModule} from '@angular/core';
import {FaIconComponent} from './fa-icon/fa-icon';
import {ProfileSkilsComponent} from './profile-skils/profile-skils';
import {ProfileAboutMeComponent} from './profile-about-me/profile-about-me';
import {JobCardComponent} from './job-card/job-card';

@NgModule({
  declarations: [
    FaIconComponent,
    ProfileSkilsComponent,
    ProfileAboutMeComponent,
    JobCardComponent],
  imports: [],
  exports: [
    FaIconComponent,
    ProfileSkilsComponent,
    ProfileAboutMeComponent,
    JobCardComponent]
})
export class ComponentsModule {
}
