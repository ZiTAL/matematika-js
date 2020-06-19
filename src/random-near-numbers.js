class RandomNearNumbersClass
{
    _random(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    _getMinMax(value, amount, min, max)
    {
        let _min = value - amount;
        let loop = 0;
        while(_min<min && loop<amount)
        {
            _min++;
            loop++;
        }
    
        let _max = value+amount;
        loop = 0;
        while(_max>max && loop<amount)
        {
            _max--;
            loop++;
        }
    
        let result = {min: _min, max: _max};
        return result;
    }
    
    _shuffle(array)
    {
      var currentIndex = array.length, temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }   
    
    get()
    {
        var result = {};

        let min = this._params.min;
        let max = this._params.max;
        let amount = this._params.amount;

        amount = (max-min<amount)?max-min:amount;
        
        let r = this._random(min, max);
        result.value = r;
        let r_min_max = this._getMinMax(r, amount, min, max);
        let rmin = r_min_max.min;
        let rmax = r_min_max.max;

        let numbers = [];
        numbers.push(r);
        
        for(var i=0; i<amount; i++)
        {
            let a;
            do
            {
                a = this._random(rmin, rmax);
            }
            while(numbers.includes(a));
            numbers.push(a);
        }
        
        result.numbers = this._shuffle(numbers);

        return result;
    }    

    constructor(params)
    {
        this._params = params;
    }
};

function RandomNearNumbers(params)
{
    var instance = new RandomNearNumbersClass(params);
    return instance.get();
}

module.exports = RandomNearNumbers;