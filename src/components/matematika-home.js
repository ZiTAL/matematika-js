import {LitElement, html} from 'lit-element';

class MatematikaHome extends LitElement
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
      var self = this;
      if(this.display==='true')
      {
  
        return html`
        <style>       
        :host > button
        {
            font-size: xxx-large;
            display: block;
            margin: 0 auto;
            width: 80%;
        }
      </style>
      <button @click="${function(e){self._reset(e)}}">HASIERA</button>
      `;
      }
  }

  constructor()
  {
    super();
  }

  _reset()
  {
    let myEvent = new CustomEvent('matematika-reset',
    {
        bubbles: true, 
        composed: true
    });      
    this.parentNode.dispatchEvent(myEvent);    
  }
}

window.customElements.define('matematika-home', MatematikaHome);
