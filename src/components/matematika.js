import "./progress-bar.js"
import "./matematika-home.js"
import "./matematika-menu.js"
import "./matematika-game.js"

import RandomNearNumbers from "../lib/random-near-numbers.js";

import { LitElement, html } from 'lit-element';

class Matematika extends LitElement {
  static get properties() {
    return {

    }
  }

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }

  _emptyProgressBar(node, timeout) {
    const width = (1 / timeout) * 2;

    let interval = window.setInterval(function () {
      const w = window.parseFloat(node.getAttribute('width'));
      let v = w - width;
      if (v <= 0) {
        v = 0;
        window.clearInterval(interval);
      }
      node.setAttribute('width', v.toString());

    }, 1000 / 60);
  }

  setProgressBar() {
    this.progress_bar = document.querySelector('progress-bar', this);
  }

  setGame()
  {
    this.game = document.querySelector('matematika-game', this);
  }

  setMenu()
  {
    this.menu = document.querySelector('matematika-menu', this);
  }

  exerciseExist(obj, exercises)
  {
      let l = exercises.length;
      for(let i=0; i<l; i++)
      {
          if((obj.operator==='+' || obj.operator==='*') && exercises[i].one===obj.two && exercises[i].two===obj.one && exercises[i].operator===obj.operator)
              return true;
          if(exercises[i].one===obj.one && exercises[i].two===obj.two && exercises[i].operator===obj.operator)
              return true;
      }
      return false;
  }
  
  isValidResult(result)
  {
      if(result===Infinity || result===-Infinity || result<0 || result % 1 !==0 || isNaN(result))
          return false;
      return true;
  }  

  constructor()
  {
    super();

    this.setProgressBar();
    this.setGame();
    this.setMenu();

    this.addEventListener('matematika-reset', function(e)
    {
      window.location.reload(true);
    });

    this.addEventListener('matematika-create', function(e)
    {
      let exercises = [];
      let v = e.detail.game;
      let amount = e.detail.amount;

      if(v==='nahastea')
      {
        let operator = '*';
        for(let i=0; i<10; i++)
        {
            let one, two, result, obj = {}, valid_result = false;

            do
            {
              one = RandomNearNumbers(
              {
                  min: 2,
                  max: 10
              });
              
              two = RandomNearNumbers(
              {
                  min: 2,
                  max: 10
              });           
   
              result = new Function("return "+one + operator +two)();
      
              valid_result = this.isValidResult(result);
              if(valid_result)
              {
                let a = RandomNearNumbers(
                {
                    value: result,
                    amount: amount
                });        
        
                obj =
                {
                    one: one,
                    operator: operator,
                    two: two,
                    result: a
                };                    
              }
            }
            while(this.exerciseExist(obj, exercises) || !valid_result)
            exercises.push(obj);
        }
      }
      else
      {
        let one = window.parseInt(v);
        for (let j = 0; j < 11; j++)
        {
          let two = j;
          let operator = '*';
          let result;
          let obj = {};
          let a;
  
          result = new Function("return " + one + operator + two)();
  
          a = RandomNearNumbers(
          {
            value: result,
            amount: amount
          });
  
          obj =
          {
            one: one,
            operator: operator,
            two: two,
            result: a
          };
  
          exercises.push(obj);
        }
      }

      let myEvent = new CustomEvent('matematika-menu-hidde',
      { 
        bubbles: true, 
        composed: true
      });      
      this.menu.dispatchEvent(myEvent);    

      myEvent = new CustomEvent('matematika-game-exec',
      { 
        detail:
        {
          exercises: exercises
        },
        bubbles: true, 
        composed: true
      });      
      this.game.dispatchEvent(myEvent);      
    });
  }
}

window.customElements.define('matematika-js', Matematika);
