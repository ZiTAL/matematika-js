import {LitElement, html} from 'lit';

class ProgressBar extends LitElement
{ 
  static get properties()
  {
    return {
      count:      {type: Number},
      width:      {type: Number},
      color:      {type: String},
      colorback:  {type: String},
      display:    {type: String}
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

  _draw()
  {
    let self = this
    
    let x = self._date_end - (+new Date());
    self.width = x * 100 / self.count

    if(self.width>0)
    {
      window.requestAnimationFrame(function()
      {
        self._draw()
      })
    }
    else
      self.width = 0
  }

  main()
  {
    let self        = this
    self._date_end  = new Date((+new Date())+self.count);
    self._draw()
  }

  connectedCallback()
  {
    super.connectedCallback()
    this.main()
  }  

  constructor()
  {
    super()
  }   
}

window.customElements.define('progress-bar', ProgressBar)