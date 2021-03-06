import { Component, Prop, h, Element, Host, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'ntara-modal',
  styleUrl: 'ntara-modal.scss',
  scoped: true
})
export class Modal {
  @Element() el: HTMLElement;

  @Prop() lightbox = '0';
  @Prop({ reflect: true, mutable: true }) show = false;
  @Prop() margin = '0px';
  @Prop() cornerRadius = '0';
  @Prop() zIndex = '1';
  @Prop({ reflect: true }) customCloseButton = false;
  @Prop({ reflect: true }) closeOutside = true;

  @Watch('show')
  watchHandler(newValue: boolean) {
    if (newValue) {
      this.modalOpenedHandler();
    } else {
      this.modalClosedHandler();
    }
  }

  @Event({ eventName: 'modal-opened' }) modalOpened: EventEmitter;
  modalOpenedHandler() {
    this.modalOpened.emit();
  }

  @Event({ eventName: 'modal-closed' }) modalClosed: EventEmitter;
  modalClosedHandler() {
    this.modalClosed.emit();
  }

  @Event({ eventName: 'close-clicked' }) closeClicked: EventEmitter;
  closeClickedHandler() {
    this.show = false;
    this.closeClicked.emit();
  }

  render() {
    return (
      <Host
        onClick={(event) => { if (this.closeOutside && event.target === this.el) this.closeClickedHandler(); }}
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
          <div class="modal-close"
             onClick={() => this.closeClickedHandler()}
             style={{ display: !this.customCloseButton ? 'flex' : 'none' }}>
            <span>×</span>
          </div>
          <slot name="custom-close-button" />
          <slot />
        </div>
      </Host>
    );
  }
}
