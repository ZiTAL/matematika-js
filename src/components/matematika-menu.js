import {LitElement, html} from 'lit-element';

class MatematikaMenu extends LitElement
{
  static get properties()
  {
    return {
      display:
      {
        type: String
      }
    }
  }    
  render()
  {
      if(this.display==='true')
      {
        let self = this;
        let numbers = [];
        for(let i=0; i<11; i++)
          numbers.push(i);
  
        return html`
        <style>
        :host > ul
        {
          width: 80%;
          margin: auto;
          margin-top: 20px;
        }
        :host > ul > li
        {
          list-style-type: none;
          display: inline-flex;
          margin: 5px;
        }
      </style>
      <ul>
          ${numbers.map(function(number)
          {
            return html`<li><button @click="${function(e){self._click(e)}}">${number}</button>`;
          })}
      </ul>
      `;
      }
  }

  constructor()
  {
    super();
    this.addEventListener('matematika-menu-hidde', function(e)
    {
      this.display = 'false';
    });    
  }

  _click(button)
  {
    button.preventDefault();
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
