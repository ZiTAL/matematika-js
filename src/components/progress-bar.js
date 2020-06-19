import {LitElement, html, css} from 'lit-element';

class ProgressBar extends LitElement
{
  static get styles()
  {
    // Write styles in standard CSS
    return css`
    `;
  }

  static get properties()
  {
    return {
      width: Number,
      color: String,
      colorback: String
    }
  }  

  render()
  {
    return html`
      <style>
      :host > div
      {
        background-color: ${this.colorback};
        width: 100%;
      }
      :host > div > div
      {
        background-color: ${this.color};
        width: ${this.width}%;
        height: 30px;
      }            
      </style>
      <div>
        <div></div>
      </div>
    `;
  }

  constructor()
  {
    super();
  }
}

window.customElements.define('progress-bar', ProgressBar);
