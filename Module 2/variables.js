//let, const, var

//let: global scope or block scope

//const: constants whose values cannot be changed

//var: global scope or function scope

var a = 10; //global scope

if(a > 5){

    var b = a * 2; //global scope
    console.log(b);

}

console.log(a);
console.log(b);