import { Component, Prop, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'ntara-sticky',
  styleUrl: 'ntara-sticky.scss',
  scoped: true
})
export class Sticky {
  @Element() el: HTMLElement;

  @Prop() fixedWidth = 'auto';
  @Prop() defaultPosition = 'static';
  @Prop() offset = 0;
  @Prop() parent = this.el.parentElement;
  @Prop() userAgent = window.navigator.userAgent;
  @Prop() zIndex = 1;

  stickySupported = !~this.userAgent.indexOf('Trident');

  componentDidLoad() {
    if (!this.stickySupported) {
      this.polyfillSticky();
    }
  }

  private polyfillSticky() {
    let elTop = this.el.getBoundingClientRect().top;
    let elHeight = this.el.getBoundingClientRect().height;
    let elWidth = this.el.getBoundingClientRect().width;
    let lastScrollY = 0;
    let ticking = false;

    let clone = document.createElement('div');
    clone.style.cssText = `
      height: ${elHeight + this.offset}px; width: ${elWidth}px; visibility: hidden; display: none;
    `;
    this.parent.insertBefore(clone, this.el);

    // Set default position on component load.
    this.el.style.position = this.defaultPosition;

    const setFixed = () => {
      if (lastScrollY >= elTop) {
        this.el.style.width = this.fixedWidth;
        this.el.style.position = 'fixed';
        clone.style.display = 'block';
      } else {
        this.el.style.width = 'auto';
        this.el.style.position = this.defaultPosition;
        clone.style.display = 'none';
      }
    }

    const update = () => {
      setFixed();
      ticking = false;
    }

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    const onScroll = () => {
      lastScrollY = window.pageYOffset;
      requestTick();
    }

    const onResize = () => {
      setTimeout(() => {
        elTop = this.el.getBoundingClientRect().top;
        lastScrollY = window.pageYOffset;
        setFixed();
      }, 500);
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
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