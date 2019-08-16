# ntara-sticky



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                                         | Type          | Default                                           |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------- |
| `offset`          | `offset`           | Defines the vertical position of the element relative to it's parent container.                                                                                     | `number`      | `0`                                               |
| `parent`          | --                 | Sets the element's parent container. Assists in calculating offsets for multiple instances of <ntara-sticky>.                                                       | `HTMLElement` | `this.el.parentElement`                           |
| `stickySupported` | `sticky-supported` | Detects the current browser's support for position: sticky. - Defaults to false if IE11 user agent is detected. - If unsupported, instantiates stickybits polyfill. | `boolean`     | `!~window.navigator.userAgent.indexOf('Trident')` |
| `zIndex`          | `z-index`          | Sets the z-index value of the sticky element.                                                                                                                       | `number`      | `1`                                               |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
