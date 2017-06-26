function Expression(term){
    this.terms = [term];
}

Expression.prototype.add = function(other){
    var used = [];
    for(var i = 0; i < other.terms.length; i++){
        used.push(false);
    }
    for(var i = 0; i < this.terms.length; i++){
        for(var j = 0; j < other.terms.length; j++){
            if(used[j]){
                continue;
            }
            if(this.terms[i].variableSetEquals(other.terms[j])){
                // TODO
            } else{

            }
        }
    }
}

Expression.prototype.sub = function(other){

}

Expression.prototype.mult = function(other){

}

Expression.prototype.div = function(other){

}

Expression.prototype.toString = function(){
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