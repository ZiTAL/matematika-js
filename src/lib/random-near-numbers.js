class RandomNearNumbersClass
{
    _random(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) ) + min
    }

    _getMin(value, amount, min)
    {
        let _min = value - amount
        let loop = 0
        while(_min<min && loop<amount)
        {
            _min++
            loop++
        }
        return _min
    }

    _getMax(value, amount, max)
    {
        let _max = value+amount
        let loop = 0
        while(_max>max && loop<amount)
        {
            _max--
            loop++
        }
        return _max
    }
    
    _shuffle(array)
    {
      var currentIndex = array.length, temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex)
      {
        // Pick a remaining element...
        randomIndex         = Math.floor(Math.random() * currentIndex)
        currentIndex       -= 1
    
        // And swap it with the current element.
        temporaryValue      = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex]  = temporaryValue
      }
    
      return array
    }   
    
    get()
    {
        let response = {}
        let min
        let max
        let amount = 0
        let r

        amount = (this._params.amount)?this._params.amount:0
        amount = (max-min<amount)?max-min:amount

        if(typeof this._params.value === 'number')
        {
            min = this._getMin(this._params.value, amount, 0)
            max = this._getMax(this._params.value, amount, this._params.value+amount)
            r   = this._params.value
        }
        else
        {
            min = (this._params.min)?this._params.min:0
            max = (this._params.max)?this._params.max:0
            r   = this._random(min, max)
        }

        response.result     = r

        let rmin            = this._getMin(r, amount, min)
        let rmax            = this._getMax(r, amount, max)

        let possible_values = []
        possible_values.push(r)
        
        for(var i=0; i<amount; i++)
        {
            let a
            do
            {
                a = this._random(rmin, rmax)
            }
            while(possible_values.includes(a))
            possible_values.push(a)
        }
        
        response.possible_values = this._shuffle(possible_values);
        if(response.possible_values.length===1)
            return response.result

        return response
    }    

    constructor(params)
    {
        this._params = params
    }
};

function RandomNearNumbers(params)
{
    var instance = new RandomNearNumbersClass(params)
    return instance.get()
}

module.exports = RandomNearNumbers