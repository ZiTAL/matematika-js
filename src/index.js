import "./components/progress-bar.js"
import RandomNearNumbers from "./random-near-numbers.js";

window.setInterval(function()
{
	let random_near_numbers = RandomNearNumbers(
    {
        min: 0,
        max: 10,
        amount: 2
    });
    console.log(random_near_numbers);
}, 1 * 1000);

const _emptyProgressBar = function(node, timeout)
{
    const width = (1 / timeout) * 2;

    let interval = window.setInterval(function()
    {
        const w = window.parseFloat(node.getAttribute('width'));
        let v = w - width;
        if(v<=0)
        {
            v = 0;
            window.clearInterval(interval);
        }                
        node.setAttribute('width', v.toString());
        
    }, 1000 / 60);
};

let timeout = 5;
let pbs = document.querySelectorAll('progress-bar');
for(let i=0; i<pbs.length; i++)
{
    _emptyProgressBar(pbs[i], timeout);
}
