$(document).ready(function(){
    runAllTests();
});

function parse(){
    var text = $('#inputBox').val();
    console.log(text);
}

function runAllTests(){
    runFractionTests();
    runTermRepresentationTests();
    runTermOperationTests();
    runTermEvaluationTests();
    runExpressionOperationTests();
    runExpressionEvaluationTests();
}

function runExpressionEvaluationTests(){
    console.log("========= Running tests for Expression evaluation =========");
    var tests = [
        {
            expr: new Expression(new Term(1, 'a')).add(new Expression(new Term(1, 'b'))),
            values: {a: 2, b: 3},
            out: new Expression(new Term(5))
        },
        {
            expr: new Expression(new Term(1, 'a')).add(new Expression(new Term(2, 'b', 3))),
            values: {a: 5, b: 3},
            out: new Expression(new Term(59))
        },
        {
            expr: new Expression(new Term(1, 'a')).add(new Expression(new Term(2, 'b', 3))),
            values: {b: 3},
            out: new Expression(new Term(54)).add(new Expression(new Term(1, 'a')))
        },
    ];
    for(var i = 0; i < tests.length; i++){
        var res = tests[i].expr.evaluate(tests[i].values);
        console.log((i+1)+". "+ (res.equals(tests[i].out) ? "OK" : "WA. Expected: "+tests[i].out.toString()+", actual: "+res.toString()));
    }
    console.log("========= Expression evaluation tests complete =========");
}

function runExpressionOperationTests(){
    console.log("========= Running tests for Expression operations =========");
    /*var e = new Expression(new Term(2, 'x'));
    console.log(e.toString());
    e = e.add(new Expression(new Term(3, 'y', 2)));
    console.log(e.toString());
    e = e.sub(new Expression(new Term(5, 'z', -1)));
    console.log(e.toString());
    e = e.sub(new Expression(new Term(2, 'y', 2)));
    console.log(e.toString());
    e = e.sub(new Expression(new Term(1, 'y', 2)));
    console.log(e.toString());
    e = e.add(new Expression(new Term(4, 'z', 2)));
    console.log(e.toString());
    e = e.add(new Expression(new Term(5, 'z', -1)));
    console.log(e.toString());
    e = e.sub(new Expression(new Term(2, 'x', 1)));
    console.log(e.toString());
    e = e.sub(new Expression(new Term(4, 'z', 2)));
    console.log(e.toString());*/
    /*var e1 = new Expression(new Term(1, 'a')).add(new Expression(new Term(1, 'b'))),
        e2 = new Expression(new Term(1, 'b')).add(new Expression(new Term(1, 'a')));
    console.log('('+e1.toString()+')('+e2.toString()+') = '+e1.mult(e2).toString());*/
    var e = new Expression(new Term(1, 'a')).add(new Expression(new Term(1, 'b')));
    var p = 10;
    console.log('('+e.toString()+')^'+p+' = '+e.pow(p).toString());
    console.log("========= Expression operation tests complete =========");
}

function runTermEvaluationTests(){
    console.log("========= Running tests for Term evaluation =========");
    var tests = [
        {
            term: new Term(1),
            values: {},
            out: new Term(1)
        },
        {
            term: new Term(1, 'x'),
            values: {},
            out: new Term(1, 'x')
        },
        {
            term: new Term(1, 'x'),
            values: {x: 5},
            out: new Term(5)
        },
        {
            term: new Term(3, ['x', 'y'], [2, 1]),
            values: {x: 2, y: new Fraction(1, 3)},
            out: new Term(4)
        },
        {
            term: new Term(new Fraction(1, 3), ['x', 'y'], [2, 1]),
            values: {x: 2},
            out: new Term(new Fraction(4, 3), 'y')
        },
        {
            term: new Term(new Fraction(1, 3), ['x', 'y', 'z'], [2, 1, 3]),
            values: {y: 4, z: 3},
            out: new Term(36, 'x', 2)
        }
    ];

    for(var i = 0; i < tests.length; i++){
        var res = tests[i].term.evaluate(tests[i].values);
        console.log((i+1)+". "+ (res.equals(tests[i].out) ? "OK" : "WA. Expected: "+tests[i].out.toString()+", actual: "+res.toString()));
    }
    console.log("========= Term evaluation tests complete =========");
}
function runTermOperationTests(){
    console.log("========= Running tests for Term operations =========");
    var tests = [
        {
            term1: new Term(1),
            term2: new Term(2),
            op: '+',
            out: new Term(3)
        },
        {
            term1: new Term(1, 'x'),
            term2: new Term(5, 'x'),
            op: '+',
            out: new Term(6, 'x')
        },
        {
            term1: new Term(10, ['x','y'], [2,3]),
            term2: new Term(1, ['x', 'y'], [2,3]),
            out: new Term(11, ['x', 'y'], [2,3]),
            op: '+'
        },
        {
            term1: new Term(1, 'x'),
            term2: new Term(2, 'x', [1]),
            out: new Term(3, 'x'),
            op: '+'
        },
        {
            term1: new Term(1, 'x'),
            term2: new Term(1, 'y'),
            out: null,
            op: '+'
        },
        {
            term1: new Term(2, 'x'),
            term2: new Term(10, 'x', 1),
            op: '-',
            out: new Term(-8, 'x')
        },
        {
            term1: new Term(3, 'y'),
            term2: new Term(3, 'y'),
            op: '-',
            out: new Term(0)
        },
        {
            term1: new Term(2, ['x', 'y'], [1, 2]),
            term2: new Term(1, ['y', 'x'], [2,1]),
            op: '-',
            out: new Term(1, ['x', 'y'], [1,2])
        },
        {
            term1: new Term(2, 'x'),
            term2: new Term(3, 'x'),
            op: '*',
            out: new Term(6, 'x', 2)
        },
        {
            term1: new Term(10, 'x'),
            term2: new Term(0),
            op: '*',
            out: new Term(0)
        },
        {
            term1: new Term(5, 'x'),
            term2: new Term(2, 'y', 2),
            op: '*',
            out: new Term(10, ['x', 'y'], [1, 2])
        },
        {
            term1: new Term(2, 'x'),
            term2: new Term(10),
            op: '*',
            out: new Term(20, 'x')
        },
        {
            term1: new Term(3),
            term2: new Term(4),
            op: '*',
            out: new Term(12)
        },
        {
            term1: new Term(1, 'x'),
            term2: new Term(5, 'x', -1),
            op: '*',
            out: new Term(5)
        },
        {
            term1: new Term(2),
            term2: new Term(5, 'x'),
            op: '/',
            out: new Term(new Fraction(2, 5), 'x', -1)
        },
        {
            term1: new Term(5, ['a', 'b', 'c', 'd'], [1,2,3,4]),
            term2: new Term(5, ['a','b','d','c'], [1,2,4,3]),
            op: '/',
            out: new Term(1)
        },
        {
            term1: new Term(10, ['a', 'b'], [1, 2]),
            term2: new Term(4, ['d'], 3),
            op: '/',
            out: new Term(new Fraction(5, 2), ['a','b','d'], [1,2,-3])
        },
        {
            term1: new Term(1, 'x'),
            term2: new Term(10),
            op: '/',
            out: new Term(0.1, 'x', 1)
        },
        {
            term1: new Term(3, 'x'),
            term2: new Term(9, 'y', -3),
            op: '/',
            out: new Term(new Fraction(1, 3), ['x', 'y'], [1, 3])
        },
        {
            term1: new Term(3),
            term2: 2,
            op: '^',
            out: new Term(9)
        },
        {
            term1: new Term(3),
            term2: -2,
            op: '^',
            out: new Term(new Fraction(1, 9))
        },
        {
            term1: new Term(2, 'x', 5),
            term2: -1,
            op: '^',
            out: new Term(0.5, 'x', -5)
        },
        {
            term1: new Term(3, ['x', 'y', 'z'], [2,3,new Fraction(-1, 3)]),
            term2: -3,
            op: '^',
            out: new Term(new Fraction(1, 27), ['x', 'y', 'z'], [-6, -9, 1])
        }
    ];
    for(var i = 0; i < tests.length; i++){
        try{
            switch(tests[i].op){
                case '+':
                    var res = tests[i].term1.add(tests[i].term2);
                    break;
                case '-':
                    var res = tests[i].term1.sub(tests[i].term2);
                    break;
                case '*':
                    var res = tests[i].term1.mult(tests[i].term2);
                    break;
                case '/':
                    var res = tests[i].term1.div(tests[i].term2);
                    break;
                case '^':
                    var res = tests[i].term1.pow(tests[i].term2);
                    break;
            }
            if(res.equals(tests[i].out)){
                console.log((i+1)+". OK");
            } else{
                console.log((i+1)+". " + "WA. Expected: "+tests[i].out.toString()+", actual: "+res.toString());
            }
        } catch(ex){
            console.log((i+1)+". "+ (tests[i].out === null ? "OK" : "WA"));
        }
    }
    console.log("========= Term operations tests complete =========");
}
function runTermRepresentationTests(){
    console.log("========= Running tests for Term representation =========");
    var tests = [
        {
            term: new Term(1),
            strRep: "1"
        },
        {
            term: new Term(2, 'x'),
            strRep: "2x"
        },
        {
            term: new Term(2, 'x', 1),
            strRep: "2x"
        },
        {
            term: new Term(5, ['x', 'y'], [2, '6']),
            strRep: "5x^2y^6"
        },
        {
            term: new Term(3, ['a', 'c', 'b', 'd'], [1,3,2,4]),
            strRep: "3ab^2c^3d^4"
        },
        {
            term: new Term(1, 'z'),
            strRep: "z"
        },
        {
            term: new Term(1, ['a','b','c'], [2,3,10]),
            strRep: "a^2b^3c^10"
        }
    ];
    for(var i = 0; i < tests.length; i++){
        console.log((i+1)+". "+(tests[i].term.toString() === tests[i].strRep ? "OK" : "WA. Expected: "+tests[i].strRep+", actual: "+tests[i].term.toString()));
    }
    console.log("========= Term representation tests complete =========");
}
function runFractionTests(){
    console.log("========= Running tests for the Fraction class =========");
    var tests = [
        {
            input: "2",
            output: new Fraction(2)
        },
        {
            input: "2.3",
            output: new Fraction(23, 10)
        },
        {
            input: "-5.67",
            output: new Fraction(-567, 100)
        },
        {
            input: "2/3",
            output: new Fraction(2, 3)
        },
        {
            input: "2/4",
            output: new Fraction(2, 4)
        },
        {
            input: "1.2.3",
            output: null
        },
        {
            input: "-1/16",
            output: new Fraction(-1, 16)
        },
        {
            input: '0',
            output: new Fraction()
        },
        {
            input: 56.123,
            output: new Fraction(56123, 1000)
        },
        {
            input: null,
            output: new Fraction()
        },
        {
            input: '2/3.5',
            output: null
        },
        {
            input: '2/3/4',
            output: null
        },
        {
            input: '2.-3',
            output: null
        },
        {
            input: '-2.3',
            output: new Fraction(-23, 10)
        },
        {
            input: '-0.0000000002',
            output: new Fraction(-2, 10000000000)
        },
        {
            input: '.3',
            output: new Fraction(3, 10)
        },
        {
            input: 1e5,
            output: new Fraction(100000)
        },
        {
            input: '1e5',
            output: new Fraction(100000)
        },
        {
            input: '1e',
            output: null
        },
        {
            input: '1e2/3',
            output: null
        }
    ];
    for(var i = 0; i < tests.length; i++){
        try{
            if(tests[i].output === null && parseFraction(tests[i].input) === null){
                console.log((i+1)+". OK");
                continue;
            } else if(tests[i].output === null){
                console.log((i+1)+". "+ "WA. Expected error, got "+parseFraction(tests[i].input).toString());
                continue;
            }
            console.log((i+1)+". "+ (tests[i].output.equals(parseFraction(tests[i].input)) ? "OK" : "WA. Expected: "+tests[i].output.toString()+", actual: "+parseFraction(tests[i].input).toString()));
        } catch (ex){
            console.log((i+1)+". WA: crash");
        }
    }
    console.log("========= Fraction tests complete =========");
}