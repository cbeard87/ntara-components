import { Component, Prop, Element, Host, h } from '@stencil/core';

import stickybits from 'stickybits';
import debounce from 'lodash.debounce';

@Component({
  tag: 'ntara-sticky',
  styleUrl: 'ntara-sticky.scss',
  scoped: true
})
export class Sticky {
  @Element() el: HTMLElement;

  /**
   * Defines the vertical position of the element
   * relative to it's parent container.
   */
  @Prop() offset: number = 0;

  /**
   * Sets the element's parent container.
   * Assists in calculating offsets for multiple
   * instances of <ntara-sticky>.
   */
  @Prop() parent: HTMLElement = this.el.parentElement;

  /**
   * Detects the current browser's support for position: sticky.
   * - Defaults to false if IE11 user agent is detected.
   * - If unsupported, instantiates stickybits polyfill.
   */
  @Prop() stickySupported: boolean = !~window.navigator.userAgent.indexOf('Trident');

  /**
   * Sets the z-index value of the sticky element.
   */
  @Prop() zIndex: number = 1;

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
    this.el.style.width = `${this.el.offsetWidth}px`;
    this.parent.style.position = 'relative';

    const stickyInstance = stickybits(this.el, {
      stickyBitStickyOffset: this.offset === 0 ? this.getOffsetHeight() : this.offset
    });

    window.addEventListener('resize', debounce(() => stickyInstance.update(), 250));
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
