import { Component, Prop, h, Host } from '@stencil/core';

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
  @Prop() onClose = null;

  handleClick() {
    this.show = false;
  }

  render() {
    return (
      <Host
        style={{
          backgroundColor: `rgba(0, 0, 0, ${this.lightbox})`,
          display: this.show ? 'flex' : 'none',
          zIndex: this.zIndex
        }}
      >
        <div class="modal"
          style={{
            margin: this.margin,
            borderRadius: `${this.cornerRadius}px`
          }}
        >
          <div class="modal-close" onClick={() => {this.show = false}}
            style={{
              display: this.showClose ? 'flex' : 'none'
            }}>
            <span class="icon-material">×</span>
          </div>
          <slot />
        </div>
      </Host>
    )
  }
}
