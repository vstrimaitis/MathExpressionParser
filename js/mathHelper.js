function gcd(a, b){
    return b === 0 ? a : gcd(b, a%b);
}

var baseLogFunction = console.log;
console.log = function(){
    baseLogFunction.apply(console, arguments);

    var args = Array.prototype.slice.call(arguments);
    for(var i=0;i<args.length;i++){
        var node = createLogNode(args[i]);
        document.querySelector("#consoleOutput").appendChild(node);
    }

}

function createLogNode(message){
    var node = document.createElement("div");
    var textNode = document.createTextNode(message);
    node.appendChild(textNode);
    return node;
}