import { Component, Prop, h, Host, Event, EventEmitter, Watch } from '@stencil/core';

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
          <div class="modal-close" onClick={() => this.closeClickedHandler()}
            style={{
              display: this.showClose ? 'flex' : 'none'
            }}>
            <span>×</span>
          </div>
          <slot />
        </div>
      </Host>
    );
  }
}
