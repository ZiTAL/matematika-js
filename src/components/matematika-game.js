import {LitElement, html} from 'lit-element';

class MatematikaGame extends LitElement
{
  render()
  {
      let self = this;
      let numbers = [];
      for(let i=0; i<11; i++)
        numbers.push(i);

      return html`
      <style>
      :host > ul > li
      {
        list-style-type: none;
      }
    </style>
    <ul>
        ${numbers.map(function(number)
        {
        return html`<li><button @click="${self._click}">${number}</button>`;
        })}
    </ul>
    `;
  }

  constructor()
  {
    super();
  }

  _click(button)
  {
    console.log(button);
  }
}

window.customElements.define('matematika-game', MatematikaGame);
