# Ntara Component Library

This is a library of Web Components built with Stencil which contains common UI patterns used at Ntara, Inc.

# Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec. (Chrome, Firefox, Edge, Safari, IE11)

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

To contribute to the Ntara Component Library, clone this repo to a new directory:

```bash
git clone https://github.com/cbeard87/ntara-components.git
cd ntara-components
```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

Need help? Check out the Stencil docs [here](https://stenciljs.com/docs/my-first-component).

## Naming Components

When creating new component tags, we use `ntara` in the component name (ex: `<ntara-datepicker>`).

All of the Ntara generated web components use the prefix `ntara`.

## Usage

### Script tag

- [Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- Put a script tag similar to this `<script src='https://unpkg.com/@cbeard87/ntara-components@0.0.5/dist/ntara-components.js'></script>` in the head of your index.html
- Then you can use the elements anywhere in your template, JSX, html, etc.

### Node Modules
- Run `npm install @cbeard87/ntara-components --save`
- Put a script tag similar to this `<script src='node_modules/@cbeard87/ntara-components/dist/ntara-components.js'></script>` in the head of your index.html or master page.
- Then you can use the element anywhere in your template, JSX, html, etc.
