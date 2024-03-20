import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
  `,
  styles:  [`

  .flex-end {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .mb-5 {
    margin-bottom: 5px;
  }

  .mr-5:not(:last-child) {
    margin-right: 5px;
  }

  .fw-400 {
    font-weight: 400;
  }

 .lh-0 {
    line-height: 0;
  }

  `]
})
export class RatingComponent implements OnInit {
  @Input() rating!: number
  grayStars: number = 5 - this.rating
  ratingWrap: HTMLElement

  get host() {
    return this.elRef.nativeElement}

  createRatingWrap() {
    this.ratingWrap = this.renderer.createElement('div')
    this.renderer.addClass(this.ratingWrap, 'flex-end')
    this.renderer.addClass(this.ratingWrap, 'lh-0')
    this.renderer.addClass(this.ratingWrap, 'mb-5')
    return this.renderer.appendChild(this.host,  this.ratingWrap)
  }

  constructor( private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.createRatingWrap()
    for (let i = 1; i <=  this.rating; i++) {this.createStars('gold')}
    for (let i = 1; i <=  5 - this.rating; i++) {this.createStars('gray')}
  }

  createStars(c: 'gold'|'gray') {
    let color: string
    c ==='gold' ? color  = "#fc0" : color = "#E6E6E6"
    const star = this.renderer.createElement('span')
    star.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=${color}><path d="M8 0c.36 0 .693.182.87.477L11.115 4.2l4.076.738c.358.065.65.307.762.632a.895.895 0 0 1-.224.93L12.77 9.45l.747 4.468a.911.911 0 0 1-.392.899 1.056 1.056 0 0 1-1.03.09L8 13.054l-4.095 1.854a1.056 1.056 0 0 1-1.03-.091.911.911 0 0 1-.392-.899L3.23 9.45.272 6.502a.895.895 0 0 1-.224-.93.981.981 0 0 1 .762-.633L4.886 4.2 7.129.477C7.307.182 7.64 0 8 0Z"></path></svg>`
    this.renderer.addClass(star, 'mr-5')
    return this.renderer.appendChild( this.ratingWrap,  star)
  }

}
