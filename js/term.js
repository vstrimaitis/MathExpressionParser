function Term(coefficient, variables, powers){
    coefficient = parseFraction(coefficient);
    if(coefficient === null){
        throw "The coefficient must be a number or a fraction!";
    }
    this.coefficient = coefficient;
    if(coefficient.equals(new Fraction(0))){
        this.variables = [];
        return;
    }
    if(variables === undefined){
        variables = [];
    }
    if(!Array.isArray(variables)){
        variables = [variables];
    }
    for(var i = 0; i < variables.length; i++){
        variables[i] = String(variables[i]);
        if(!variables[i].match(/^[a-z]+(_[a-z0-9]+)?$/)){
            throw "The variable `"+variables[i]+"` does not match the variable naming conventions.";
        }
    }
    if(powers === undefined){
        powers = [];
        for(var i = 0; i < variables.length; i++){
            powers.push(1);
        }
    }
    if(!Array.isArray(powers)){
        powers = [powers];
    }
    if(variables.length !== powers.length){
        throw "The number of variables and the number of powers provided do not match!";
    }
    for(var i = 0; i < powers.length; i++){
        powers[i] = parseFraction(powers[i]);
        if(powers[i] === null){
            throw "The powers must be numbers or fractions!";
        }
    }

    this.variables = [];
    for(var i = 0; i < variables.length; i++){
        this.variables.push({name: variables[i], power: powers[i]});
    }

    this.variables.sort((x,y) => {return x.name > y.name;});
}

Term.prototype.toString = function(){
    var ret = this.coefficient.toString();
    if(this.coefficient.equals(new Fraction(1)) && this.variables.length !== 0){
        ret = "";
    }
    for(var i = 0; i < this.variables.length; i++){
        ret += this.variables[i].name;
        if(!this.variables[i].power.equals(new Fraction(1))){
            ret += "^"+this.variables[i].power;
        }
    }
    return ret;
}

Term.prototype.equals = function(other){
    if(!this.coefficient.equals(other.coefficient)){
        return false;
    }
    if(this.variables.length !== other.variables.length){
        return false;
    }
    for(var i = 0; i < this.variables.length; i++){
        if(this.variables[i].name !== other.variables[i].name || !this.variables[i].power.equals(other.variables[i].power)){
            return false;
        }
    }
    return true;
}

Term.prototype.variableSetEquals = function(other){
    var str1 = "", str2 = "";
    for(var i = 0; i < this.variables.length; i++){
        str1 += this.variables[i].name+"^"+this.variables[i].power;
    }
    for(var i = 0; i < other.variables.length; i++){
        str2 += other.variables[i].name+"^"+other.variables[i].power;
    }
    return str1 === str2;
}

Term.prototype.add = function(other){
    if(!this.variableSetEquals(other)){
        throw "Cannot combine these terms, because their variable sets do not match!";
    }
    return new Term(this.coefficient.add(other.coefficient),
                    this.variables.map(x => x.name),
                    this.variables.map(x => x.power));
}

Term.prototype.sub = function(other){
    if(!this.variableSetEquals(other)){
        throw "Cannot combine these terms, because their variable sets do not match!";
    }
    return new Term(this.coefficient.sub(other.coefficient),
                    this.variables.map(x => x.name),
                    this.variables.map(x => x.power));
}

Term.prototype.mult = function(other){
    var c = this.coefficient.mult(other.coefficient);
    var varMap = {};

    for(var i = 0; i < this.variables.length; i++){
        varMap[this.variables[i].name] = this.variables[i].power;
    }
    for(var i = 0; i < other.variables.length; i++){
        if(varMap[other.variables[i].name] === undefined){
            varMap[other.variables[i].name] = new Fraction();
        }
        varMap[other.variables[i].name] = varMap[other.variables[i].name].add(other.variables[i].power);
    }
    var variables = [], powers = [];
    for(var key in varMap){
        if(varMap.hasOwnProperty(key)){
            if(varMap[key].equals(new Fraction())){
                continue;
            }
            variables.push(key);
            powers.push(varMap[key]);
        }
    }
    return new Term(c, variables, powers);
}

Term.prototype.pow = function(e){
    if(e !== parseInt(e)){
        throw 'The exponent must be an integer!';
    }
    if(e < 0){
        var t = new Term(this.coefficient.pow(-1), this.variables.map(x => x.name), this.variables.map(x => x.power.mult(-1)));
        return t.pow(-e);
    }
    if(e === 0){
        return new Term(1);
    }
    var ee = Math.floor(e/2);
    var res = this.pow(ee);
    return e%2 === 0 ? res.mult(res) : res.mult(res).mult(this);
}

Term.prototype.div = function(other){
    var coeff = new Fraction(1).div(other.coefficient);
    var varNames = [], powers = [];
    for(var i = 0; i < other.variables.length; i++){
        varNames.push(other.variables[i].name);
        powers.push(other.variables[i].power.mult(new Fraction(-1)));
    }
    var newTerm = new Term(coeff, varNames, powers);
    return this.mult(newTerm);
}