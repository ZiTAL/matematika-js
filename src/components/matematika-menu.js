import {LitElement, html} from 'lit-element';

class MatematikaMenu extends LitElement
{
  static get properties()
  {
    return {
      display:
      {
        type: String
      },
      amount:
      {
        type: Number
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
        :host > p
        {
          text-align:center;
          width: 80%;
          margin: auto;
          list-style-type: none;
          font-size: 1em;
        }                
        :host > p > select
        {
          font-size: 1em;
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
      <p>
        <span>Erantzun kopurua: </span>
        <select @change="${function(e){self._change(e)}}">
          ${[1,2,3].map(function(i)
          {
            return html`<option value="${i}">${i+1}</option>`;
          })}
        </select>
      </p>
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
    this.amount = 1;

    this.addEventListener('matematika-menu-hidde', function(e)
    {
      this.display = 'false';
    });    
  }

  _change(select)
  {
    select.preventDefault();
    this.amount = window.parseInt(select.target.value);
  }

  _click(button)
  {
    button.preventDefault();
    let game = button.target.innerText;
    let amount = this.amount;

    let myEvent = new CustomEvent('matematika-create',
    { 
      detail:
      {
        amount: amount,
        game: game
      },
      bubbles: true, 
      composed: true
    });      
    this.parentNode.dispatchEvent(myEvent);    
  }
}

window.customElements.define('matematika-menu', MatematikaMenu);
