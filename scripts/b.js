const RandomNearNumbers = require("../src/lib/random-near-numbers.js");
let operators = "+-*/".match(/[^\s]{1}/g);
let exercises = [];
for(let i=0; i<11; i++)
{
    exercises[i] = [];
    for(let j=0; j<11; j++)
    {
        let one, two, operator, result, obj = {}, a;
        one = i;
        operator = '*';
        two = j;

        result = new Function("return "+one + operator +two)();
    
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
        exercises[i].push(obj);
    }
}

console.log(exercises);
/*
exercises.map(function(exercise)
{
//  console.log(exercise.result);
    console.log(exercise.one+" "+exercise.operator+" "+exercise.two+" = "+exercise.result.result);
});
*/

function exerciseExist(obj, exercises)
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

function isValidResult(result)
{
    if(result===Infinity || result===-Infinity || result<0 || result % 1 !==0 || isNaN(result))
        return false;
    return true;
}