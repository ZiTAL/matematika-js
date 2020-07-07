import {LitElement, html} from 'lit-element';

class MatematikaGame extends LitElement
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
      console.log("a", this.display);
      if(this.display==='true')
      {
        return html`
            MATEMATIKA-GAME
      `;
      }
  }

  constructor()
  {
    super();
  }
}

window.customElements.define('matematika-game', MatematikaGame);
