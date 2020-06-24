const RandomNearNumbers = require("../src/lib/random-near-numbers.js");
let operators = "+-*/".match(/[^\s]{1}/g);
let exercises = [];
for(let i=0; i<10; i++)
{
    let one, two, operator, result, obj = {}, valid_result = false;
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

        valid_result = isValidResult(result);
        if(valid_result)
        {
            let a = RandomNearNumbers(
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
        }
    }
    while(exerciseExist(obj, exercises) || !valid_result)

    exercises.push(obj);
}

exercises.map(function(exercise)
{
//  console.log(exercise.result);
    console.log(exercise.one+" "+exercise.operator+" "+exercise.two+" = "+exercise.result.result);
});

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