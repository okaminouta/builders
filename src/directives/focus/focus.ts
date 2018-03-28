import {Directive, AfterViewInit, ElementRef, HostBinding, OnInit, HostListener} from '@angular/core';

/**
 * Generated class for the FocusDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[focus]' // Attribute selector
})
export class FocusDirective implements OnInit {
  @HostBinding('style.border') border:string;

  constructor(private el: ElementRef) {
  }

  ngOnInit (){

  }

  @HostListener ('mouseenter') mouseover (eventData: Event){
    this.border = '1px solid black';
  }

  @HostListener ('mouseleave') mouseleave (eventData: Event){
    this.border = 'none';
  }

  // ngAfterViewInit() {
  //   this.el.nativeElement.click(()=>{
  //     console.log('123')
  //   });
  // }

}
