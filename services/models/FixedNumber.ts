/**
 * FixedNumber class can be used to handle currency values returned by smart contracts
 * mainly it has methods to scale-down, scale-up values. 
 */
 class FixedNumber {

    private _value: string = '0';
	private _precision: number;
	private _tokenDecimals: number;


    constructor(value: string | bigint , private tokenDecimals: number = 0) {
		this._value = value.toString().trim();
		this._precision = 3;
		this._tokenDecimals = tokenDecimals;
    }
	
    get originalValue(): string {
		return this._value;
	}
	
	get originalBigIntValue(): bigint {
		return BigInt(this._value);
	}

	get originalCleanValue(): string {
		// if last char in the _value is (.) then remove the decimal point 
		if(this._value && this._value.indexOf('.') === (this._value.length - 1)){
			return this._value.substring(0, this._value.length - 1)
		}
		return this._value;
	}

    /**
     * @description scale down value using the token decimal 
     */
    get scaleDownValue(): string {

		var val = this._value;
		while (val.length <= this._tokenDecimals) {
			val = '0' + val;
		}
        val = val.slice(0, val.length - this._tokenDecimals)
                    + '.'
                    + val.slice(val.length - this._tokenDecimals, val.length - this._tokenDecimals + this._precision);
		return val;
	}

    /**
     * @description scale down value using the token decimal 
     */
    get scaleDownIntValue(): bigint {

		var val = this._value;
		while (val.length <= this._tokenDecimals) {
			val = '0' + val;
		}
        return BigInt(val.slice(0, val.length - this._tokenDecimals));
	}

    /**
     * @description scale up value using token decimal 
     */
    get scaleUpValue(): bigint {
        
		var val = this._value;
		var pointIdx = val.indexOf('.');
		if (pointIdx < 0) {
			val = val + '.0';
			pointIdx = val.indexOf('.');
		}
		
		while (val.slice(pointIdx + 1).length < this._tokenDecimals) {
			val = val + '0';
		}
		return BigInt(val.replace('.', ''));
    }

    static formate = function(valIn: string | bigint )  {
        if(!valIn){
            return '0';
        }
		var val = valIn.toString();
		
		//format invoked twice
		if ((val.indexOf(',') > 0) || (val.indexOf('K') > 0) || (val.indexOf('M') > 0)) {
			return val;
		}
        
		var pointIdx = val.indexOf('.');
		if (pointIdx < 0) {
			return Intl.NumberFormat('en-US').format(BigInt(val));
		}
		
		return Intl.NumberFormat('en-US').format(BigInt(val.slice(0, pointIdx))) + '.' + val.slice(pointIdx+1);
        
    }
	
    static formatCompact = function(valIn: string | bigint, showDecimals:number = 0 ):string  {
        
        if(!valIn){
            return '0';
        }
		var val = valIn.toString();
		
		//format invoked twice
		if ((val.indexOf(',') > 0) || (val.indexOf('K') > 0) || (val.indexOf('M') > 0)) {
			return val;
		}

		//get int part
		var intval = BigInt(0);
		var pointIdx = val.indexOf('.');
		if (pointIdx < 0) {
			intval = BigInt(val);
		} else {
			intval = BigInt(val.slice(0, pointIdx));
		}
		
		//divider
		var d = BigInt(0);
		var l = '';
		if (intval > 999999) {
			d = BigInt(1000000);
			l = 'M';
		} else if (intval > 999) {
			d = BigInt(1000);
			l = 'K';
		} else {
			if (showDecimals > 0) {
				if (val.length - pointIdx > showDecimals + 1) {
					return val.slice(0, pointIdx + showDecimals + 1);
				}
				if (pointIdx < 0) {
					val = val + '.';
					var pointIdx = val.indexOf('.');
				}
				
				while (val.length - pointIdx < showDecimals + 1) {
					val = val + '0';
				}
			}
			return val;
		}
		
		//decimals
		var i = intval / d;
		var f = BigInt(intval % d).toString();
		while (f.length < 3) {
			f = f + '0';
		}
		
		return i + '.' + f.slice(0, 3) + l;
		        
    }
	
	//TODO: move to some proper place
    static formatTxHash = function(valIn: string)  {
        
        if(!valIn){
            return '0';
        }
		var val = valIn.toString();
		
		//0x30...343a
		if (val.length < 11) {
			return val;
		}
		
		return val.slice(0,4) + '...' + val.slice(val.length - 4);
    }
	
}

export default FixedNumber;