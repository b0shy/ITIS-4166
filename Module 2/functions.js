//function declaration

//function name(parameter list) {//body}

console.log(sum(3, 4));

function sum(a, b){

    return a + b;

}

//function expression

//const name = function(parameter list) {//body};

const sumExp = function(a,b){

    return a+b;

};

console.log(sumExp(3,4));

//arrow function {ES6}

//const name = (parameter list) => {//body};

const sumArrow = (a,b) => a+b;

console.log(sumArrow(2,6));