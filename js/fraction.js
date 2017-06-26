function Fraction(top, bottom){
    if(bottom === undefined) bottom = 1;
    if(top === undefined) top = 0;
    if(top !== parseInt(top, 10) || bottom !== parseInt(bottom, 10)){
        throw "The numerator and denominator must be integers!";
    }
    if(bottom === 0){
        throw "The denominator cannot be zero!";
    }
    this.top = top;
    this.bottom = bottom;
    if(this.bottom < 0){
        this.bottom *= -1;
        this.top *= -1;
    }
    this.simplify();
}

Fraction.prototype.simplify = function(){
    var g = gcd(this.top > 0 ? this.top : -this.top, this.bottom > 0 ? this.bottom : -this.bottom);
    this.top /= g;
    this.bottom /= g;
}

Fraction.prototype.add = function(other){
    var ret = new Fraction(this.top*other.bottom + other.top*this.bottom, this.bottom*other.bottom);
    return ret;
}

Fraction.prototype.sub = function(other){
    var ret = new Fraction(this.top*other.bottom - other.top*this.bottom, this.bottom*other.bottom);
    return ret;
}

Fraction.prototype.mult = function(other){
    var ret = new Fraction(this.top*other.top, this.bottom*other.bottom);
    return ret;
}

Fraction.prototype.div = function(other){
    var ret = new Fraction(this.top*other.bottom, this.bottom*other.top);
    return ret;
}

Fraction.prototype.toString = function(){
    if(this.top === 0) return "0";
    if(this.bottom === 1) return ""+this.top;
    return this.top + "/" + this.bottom;
}

Fraction.prototype.value = function(){
    return this.top/this.bottom;
}

Fraction.prototype.equals = function(other){
    return this.top*other.bottom === this.bottom*other.top;
}

Fraction.prototype.greaterThan = function(other){
    return this.top*other.bottom > other.top*this.bottom;
}

Fraction.prototype.lessThan = function(other){
    return this.top*other.bottom < other.top*this.bottom;
}
function parseFraction(text){
    if(!text){
        return new Fraction();
    }
    text = String(text);
    var parts = text.split('.');
    if(parts.length === 1){
        var partsSlash = parts[0].split('/');
        if(partsSlash.length === 1){
            var partsE = partsSlash[0].split(/[eE]/);
            if(partsE.length === 1){
                return new Fraction(parseInt(parts[0], 10));
            } else if(partsE.length === 2){
                if(partsE[0].length > 0 && partsE[1].length > 0){
                    var a = new Fraction(parseInt(partsE[0], 10));
                    var b = new Fraction(Math.pow(10, parseInt(partsE[1], 10)));
                    return a.mult(b);
                }
            }
        } else if(partsSlash.length === 2){
            var top = partsSlash[0];
            var bottom = partsSlash[1];
            if(top == parseInt(top, 10) && bottom == parseInt(bottom, 10)){
                return new Fraction(parseInt(top, 10), parseInt(bottom, 10));
            }
        }
    } else if(parts.length === 2){
        var sign = parts[0][0] == '-' ? -1 : 1;
        var whole = 0;
        if(parts[0].length > 0){
            if(parts[0] == parseInt(parts[0], 10)){
                whole = Math.abs(parseInt(parts[0], 10));
            } else{
                return null;
            }
        }
        var frac = 1;
        if(parts[1] == parseInt(parts[1], 10)){
            frac = parseInt(parts[1], 10);
        } else{
            return null;
        }
        if(frac <= 0) return null;
        var pow10 = Math.pow(10, parts[1].length);
        var ret = new Fraction(frac + Math.abs(whole)*pow10, pow10).mult(new Fraction(sign));
        return ret;
    }
    return null;
}