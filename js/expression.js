function Expression(term){
    if(term === undefined){
        this.terms = [];
    } else{
        this.terms = [term];
    }
}

Expression.prototype.clone = function() {
    var expr = new Expression();
    expr.terms = this.terms.slice();
    return expr;
}

Expression.prototype.add = function(other){
    var expr = this.clone();
    var terms = other.terms.slice();

    for(var i = expr.terms.length-1; i >= 0; i--){
        for(var j = terms.length-1; j >= 0; j--){
            if(expr.terms[i].variableSetEquals(terms[j])){
                expr.terms[i] = expr.terms[i].add(terms[j]);
                if(expr.terms[i].equals(new Term(0))){
                    expr.terms.splice(i, 1);
                }
                terms.splice(j, 1);
            }
        }
    }
    for(var i = 0; i < terms.length; i++){
        expr.terms.push(terms[i]);
    }
    return expr;
}

Expression.prototype.sub = function(other){
    var expr = other.clone();
    for(var i = 0; i < expr.terms.length; i++){
        expr.terms[i] = expr.terms[i].mult(new Term(-1));
    }
    return this.add(expr);
}

Expression.prototype.mult = function(other){
    var expr = new Expression();
    for(var i = 0 ; i < this.terms.length; i++){
        var e = new Expression();
        for(var j = 0; j < other.terms.length; j++){
            e = e.add(new Expression(this.terms[i].mult(other.terms[j])));
        }
        expr = expr.add(e);
    }
    return expr;
}

Expression.prototype.pow = function(e){
    if(e !== parseInt(e)){
        throw 'The exponent must be an integer';
    }
    if(e === 0){
        return new Expression(new Term(1));
    }
    var ee = Math.floor(e/2);
    var res = this.pow(ee);
    return e%2 === 0 ? res.mult(res) : res.mult(res).mult(this);
}

Expression.prototype.div = function(other){
    var frac = parseFraction(other);
    if(frac === null){
        throw 'You can only divide by a number or fraction'; // No better solution yet :/
    }
    return this.mult(frac.pow(-1));
}

Expression.prototype.toString = function(){
    if(this.terms.length === 0){
        return "0";
    }
    var ret = "";
    for(var i = 0; i < this.terms.length; i++){
        var t = this.terms[i];
        if(i > 0){
            if(t.coefficient.greaterThan(new Fraction(0))){
                ret += ' + ';
            } else{
                ret += ' - ';
                t = t.mult(new Term(-1));
            }
        }

        ret += t.toString();
    }
    return ret;
}