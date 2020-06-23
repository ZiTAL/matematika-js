const RandomNearNumbers = require("../src/lib/random-near-numbers.js");

let operators = "+-/*".match(/[^\s]{1}/g);
for(let i=0; i<10; i++)
{
    let one = RandomNearNumbers(
    {
        min: 0,
        max: 10
    });

    let operator_random_index = random_near_numbers = RandomNearNumbers(
    {
        min: 0,
        max: operators.length-1
    });
    let operator = operators[operator_random_index];

    let two = RandomNearNumbers(
    {
        min: 0,
        max: 10
    });

    let result = new Function("return "+one + operator +two)();

    var a = RandomNearNumbers(
    {
        value: result,
        amount: 2
    });
    console.log(one+" "+operator+" "+two+" = ",a);
}