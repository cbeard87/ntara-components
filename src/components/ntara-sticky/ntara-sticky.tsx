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

  private getOffsetHeight() {
    let elements = this.parent.querySelectorAll(this.el.tagName);
    let offset = 0;
    let index = 0;
    while (index < elements.length && elements[index] !== this.el) {
      offset += elements[index].clientHeight;
      index++;
    }
    return offset;
  }

  private polyfillSticky() {
    let elTop = this.el.getBoundingClientRect().top;
    let elHeight = this.el.getBoundingClientRect().height;
    let elWidth = this.el.getBoundingClientRect().width;
    let lastScrollY = 0;
    let ticking = false;
    let offset = this.offset === 0 ? this.getOffsetHeight() : this.offset;

    let clone = document.createElement('div');
    clone.style.cssText = `
      height: ${elHeight + offset}px; width: ${elWidth}px; visibility: hidden; display: none;
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
          top: `${this.offset === 0 ? this.getOffsetHeight() : this.offset}px`,
          zIndex: `${this.zIndex}`
        }}
      >
        <slot />
      </Host>
    )
  }
}
