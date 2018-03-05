import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { FaIconComponent } from './fa-icon/fa-icon';
@NgModule({
	declarations: [HeaderComponent,
    FaIconComponent],
	imports: [],
	exports: [HeaderComponent,
    FaIconComponent]
})
export class ComponentsModule {}
