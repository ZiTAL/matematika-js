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
      }
    }
  }    
  render()
  {
      if(this.display==='true')
      {
        let exercise = this.exercises[this.index];
/*        
        return html`
          ${this.exercises.map(function(exercise)
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
                  <li><button>${possible_value}</button></li>
                `;
              })}
              </ul>
            </li>
            `;
          })}        
      `;
*/      
        return html`
        <li>
          <span>${exercise.one}</span>
          <span>${exercise.operator}</span>
          <span>${exercise.two}</span>
          <ul>
          ${exercise.result.possible_values.map(function(possible_value)
          {
            return html`
              <li><button>${possible_value}</button></li>
            `;
          })}
          </ul>
        </li>
        `;
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

      window.setInterval(function()
      {
        self.index++;
        if(self.index>10)
          self.index = 0;
      }, 1 * 1000);
    });
  }
}

window.customElements.define('matematika-game', MatematikaGame);
