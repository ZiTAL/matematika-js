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
        :host
        {
          font-size: 5em;
        }          
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
        :host > ul > li > button
        {
          list-style-type: none;
          margin: 5px;
          font-size: 2em;
        }        
      </style>
      <ul>
          ${numbers.map(function(number)
          {
            return html`<li><button @click="${function(e){self._click(e)}}">${number}</button>`;
          })}
          <li><button @click="${function(e){self._click(e)}}">nahastea</li>
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
    var game = button.target.innerText;

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
