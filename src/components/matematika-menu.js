import {LitElement, html} from 'lit-element';

class MatematikaMenu extends LitElement
{
  static get properties()
  {
    return {
      display:
      {
        type: Boolean
      }
    }
  }    
  render()
  {
      var self = this;
      let myEvent = new CustomEvent('my-event',
      { 
        detail:
        {
          message: 'my-event happened.'
        },
        bubbles: true, 
        composed: true
      });      
      this.parentNode.dispatchEvent(myEvent);
      if(this.display)
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
            return html`<li><button @click="${function(e){self._click(e)}}">${number}</button>`;
          })}
          
          <li @click="${this._click}">iban</li>
      </ul>
      `;
      }
  }

  constructor()
  {
    super();
  }

  _click(button)
  {
    button.preventDefault();
    console.log(button);
    var game = window.parseInt(button.target.innerText);
    console.log(game);
  }
}

window.customElements.define('matematika-menu', MatematikaMenu);
