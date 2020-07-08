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

    let myEvent = new CustomEvent('matematika-create',
    { 
      detail:
      {
        game: game
      },
      bubbles: true, 
      composed: true
    });      
    this.parentNode.dispatchEvent(myEvent);    
  }
}

window.customElements.define('matematika-menu', MatematikaMenu);
