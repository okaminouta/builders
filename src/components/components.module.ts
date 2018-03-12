import {NgModule} from '@angular/core';
import {FaIconComponent} from './fa-icon/fa-icon';
import {ProfileSkilsComponent} from './profile-skils/profile-skils';
import {ProfileAboutMeComponent} from './profile-about-me/profile-about-me';

@NgModule({
    declarations: [
        FaIconComponent,
        ProfileSkilsComponent,
        ProfileAboutMeComponent],
    imports: [],
    exports: [
        FaIconComponent,
        ProfileSkilsComponent,
        ProfileAboutMeComponent]
})
export class ComponentsModule {
}