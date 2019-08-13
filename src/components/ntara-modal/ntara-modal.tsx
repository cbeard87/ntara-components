import { Component, Prop, h, Host, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'ntara-modal',
  styleUrl: 'ntara-modal.scss',
  scoped: true
})
export class Modal {

  @Prop() lightbox = '0';
  @Prop({ reflect: true, mutable: true }) show = false;
  @Prop() margin = '0px';
  @Prop() cornerRadius = '0';
  @Prop() zIndex = '1';
  @Prop({ reflect: true }) showClose = true;

  @Element() el: HTMLElement;

  @Event() onModalClose: EventEmitter;

  fireOnModalClose(e) {
    this.onModalClose.emit(e);
  }

    handleClick(e) {
    this.show = false;
    this.fireOnModalClose(e);
  }

  render() {
    return (
      <Host
        style={{
          backgroundColor: `rgba(0, 0, 0, ${this.lightbox})`,
          display: this.show ? 'flex' : 'none',
          zIndex: this.zIndex
        }}>
        <div class="modal"
          style={{
            margin: this.margin,
            borderRadius: `${this.cornerRadius}px`
          }}>
          <div class="modal-close" onClick={(e) => this.handleClick(e)}
            style={{
              display: this.showClose ? 'flex' : 'none'
            }}>
            <span class="icon-material">×</span>
          </div>
          <slot />
        </div>
      </Host>
    );
  }
}
