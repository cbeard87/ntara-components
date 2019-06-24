import { Component, Prop, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'ntara-sticky',
  styleUrl: 'ntara-sticky.scss',
  scoped: true
})
export class Sticky {
  @Element() el: HTMLElement;

  @Prop() offset = 0;
  @Prop() zIndex = 1;

  private stickySupported(): boolean {
    const ua = window.navigator.userAgent;
    const isIE = !~ua.indexOf('Trident');

    return isIE;
  }

  // TODO: Clean this function up
  polyfillSticky() {
    const elPosition = this.el.getBoundingClientRect().top;
    const elHeight = this.el.getBoundingClientRect().height;
    const nextEl = this.el.nextElementSibling as HTMLElement;
    this.el.style.width = '100%';
    document.addEventListener('scroll', () => {
      if (window.pageYOffset >= elPosition - this.offset) {
        this.el.style.position = 'fixed';
        nextEl.style.marginTop = `${elHeight}px`;
      } else {
        this.el.style.position = 'static';
        nextEl.style.marginTop = `0px`;
      }
    });
  }

  componentDidLoad() {
    if (!this.stickySupported()) {
      this.polyfillSticky();
    }
  }

  render() {
    return (
      <Host
        style={{
          top: `${this.offset}px`,
          zIndex: `${this.zIndex}`
        }}
      >
        <slot />
      </Host>
    )
  }
}