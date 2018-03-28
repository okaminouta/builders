import { NgModule } from '@angular/core';
import { Mask } from './mask/mask';
import { FocusDirective } from './focus/focus';

@NgModule({
	declarations: [Mask,
    FocusDirective],
	imports: [],
	exports: [Mask,
    FocusDirective]
})
export class DirectivesModule {}
