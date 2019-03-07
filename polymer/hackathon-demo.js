import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `hackathon-demo`
 * a component to to demo notification banner and review rating component
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class HackathonDemo extends PolymerElement {
  static get template() {
    return html`
    `;
  }

  static get is() {
    return 'hackathon-demo';
  }

  static get properties() {
    return {
	  };
  }
}

window.customElements.define(HackathonDemo.is, HackathonDemo);
