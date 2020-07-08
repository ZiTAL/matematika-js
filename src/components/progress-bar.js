import {LitElement, html} from 'lit-element';

class ProgressBar extends LitElement
{
  static get properties()
  {
    return {
      width:
      {
        type: Number
      },
      color:
      {
        type: String
      },
      colorback:
      {
        type: String
      },
      display:
      {
        type: String
      }
    }
  }  

  render()
  {
    let output = '';
    if(this.display==='true')
    {
      output = html`
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
    return output;
  }

  constructor()
  {
    super();
  }
}

window.customElements.define('progress-bar', ProgressBar);
