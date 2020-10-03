import {LitElement, html} from 'lit-element';

class MatematikaGame extends LitElement
{
  static get properties()
  {
    return {
      display:
      {
        type: String
      },
      exercises: 
      {
        type: Array
      },
      index:
      {
        type: Number
      },
      response:
      {
        type: Boolean
      },
      show_response:
      {
        type: Boolean
      }
    }
  }    
  render()
  {
      if(this.display==='true')
      {
        let exercise = this.exercises[this.index];
        if(typeof exercise !== 'undefined')
        {
          return html`
          <style>
          :host
          {
            font-size: 5em;
          }
          :host > div
          {
            text-align: center;
            margin-top: 20px;
          }
          :host > div
          {
            text-align: center;
            margin-top: 20px;
          }
          :host ul
          {
            text-align: center;
            list-style-type: none;
          }
          :host button
          {
            font-size: 1em;
            margin: 5px;
            width: 25%;
          }          
          :host .response
          {
            color: white;
            padding: 10px;
          }           
          :host .ondo
          {
            background-color: green;
          } 
          :host .txarto
          {
            background-color: red;
          }   
          </style>          
          <div>
            <ul>
              <li>
                <span>${exercise.two}</span>
                <span>${exercise.operator}</span>
                <span>${exercise.one}</span>
                <span> = ? </span>
              </li>
            </ul>
            <ul>
              ${exercise.result.possible_values.map(function(possible_value)
              {
                return html`
                  <li><button @click="${function(e){this._check(this.index, possible_value)}}">${possible_value}</button></li>
                `;
              })}
            </ul>
            ${this.show_response && this.response ?
              html`<span class="response ondo">Ondo!</span>` :
              html``}
            ${this.show_response && !this.response ?
              html`<span class="response txarto">Txarto...</span>` :
              html``}              
          </div>
          `;
        }
        else
          window.location.reload();
      }
  }

  _check(index, possible_value)
  {
    let self = this;
    if(self.exercises[index].result.result===possible_value)
    {
      self._showResult(true, function()
      {
        self.exercises.splice(index, 1);
        self.exercises = [...self.exercises];
        if(typeof self.exercises[self.index] === 'undefined')
          self.index = 0;
      });
    }
    else
    {
      self._showResult(false, function()
      {
        if(typeof self.exercises[self.index+1] === 'undefined')
          self.index = 0;
        else
          self.index++;
      });      
    }
  }

  _showResult(type, callback)
  {
    let self = this;
    self.response = type;
    self.show_response = true;

    window.setTimeout(function()
    {
      callback();
      self.show_response = false;
    }, 1 * 1000);    
  }

  constructor()
  {
    super();
    let self = this;
    self.show_response = false;

    this.addEventListener('matematika-game-exec', function (e)
    {
      self.display = 'true';
      self.index = 0;
      self.exercises = e.detail.exercises;
    });
  }
}

window.customElements.define('matematika-game', MatematikaGame);
