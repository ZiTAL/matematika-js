import "./progress-bar.js"
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

  setGame() {
    this.game = document.querySelector('matematika-game', this);
  }  

  main() {
/*    
    window.setInterval(function () {
      let random_near_numbers = RandomNearNumbers(
        {
          min: 0,
          max: 10,
          amount: 2
        });
      console.log(random_near_numbers);
    }, 1 * 1000);

    this._emptyProgressBar(this.progress_bar, 20);
*/    
  }

  constructor() {
    super();
    this.setProgressBar();
    this.setGame();
    this.main();

    this.addEventListener('matematika-create', function (e)
    {
      let exercises = [];
      let one = e.detail.game;
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
          amount: 2
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
      let myEvent = new CustomEvent('matematika-game-exec',
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
