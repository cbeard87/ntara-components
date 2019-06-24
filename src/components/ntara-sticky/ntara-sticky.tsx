import { Component, Prop, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'ntara-sticky',
  styleUrl: 'ntara-sticky.scss',
  scoped: true
})
export class Sticky {
  @Element() el: HTMLElement;

  @Prop() offset = 0;

  private stickySupported(): boolean {
    const ua = window.navigator.userAgent;
    const isIE = !~ua.indexOf('Trident');

    return isIE;
  }

  polyfillSticky() {
    const elPosition = this.el.getBoundingClientRect().top;
    document.addEventListener('scroll', () => {
      if (window.pageYOffset >= elPosition - this.offset) {
        this.el.style.position = 'fixed';
      } else {
        this.el.style.position = 'static';
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
          top: `${this.offset}px`
        }}
      >
        <slot />
      </Host>
    )
  }
}