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
      fail:
      {
        type: Number
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
          <li>
            <span>${exercise.one}</span>
            <span>${exercise.operator}</span>
            <span>${exercise.two}</span>
            <ul>
            ${exercise.result.possible_values.map(function(possible_value)
            {
              return html`
                <li><button @click="${function(e){this._check(this.index, possible_value)}}">${possible_value}</button></li>
              `;
            })}
            </ul>
          </li>
          `;
        }
        else
          window.location.reload(true);
      }
  }

  _check(index, possible_value)
  {
    if(this.exercises[index].result.result===possible_value)
    {
      this.exercises.splice(index, 1);
      this.exercises = [...this.exercises];
    }
    else
    {
      this.index++;
      if(typeof this.exercises[this.index+1] === 'undefined')
        this.index = 0;
    }
  }

  constructor()
  {
    super();
    let self = this;

    this.addEventListener('matematika-game-exec', function (e)
    {
      self.display = 'true';
      self.index = 0;
      self.exercises = e.detail.exercises;
    });
  }
}

window.customElements.define('matematika-game', MatematikaGame);
