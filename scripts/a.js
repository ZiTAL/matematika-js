const RandomNearNumbers = require("../src/lib/random-near-numbers.js");

let operators = "+-/*".match(/[^\s]{1}/g);
for(let i=0; i<10; i++)
{
    let one, two, operator, result;
    do
    {
        one = RandomNearNumbers(
        {
            min: 0,
            max: 10
        });
    
        operator_random_index = random_near_numbers = RandomNearNumbers(
        {
            min: 0,
            max: operators.length-1
        });
        operator = operators[operator_random_index];
    
        two = RandomNearNumbers(
        {
            min: 0,
            max: 10
        });
        result = new Function("return "+one + operator +two)();
    }
    while(result===Infinity || result===-Infinity || result<0 || result % 1 !==0 || isNaN(result))


    var a = RandomNearNumbers(
    {
        value: result,
        amount: 2
    });
    console.log(one+" "+operator+" "+two+" = ",a);
}
