// TODO: move to a file for generic functions
const compose = f => g => a => f(g(a));
const succ = num => f => compose(f)(num(f));

const add = num1 => num2 => num1(succ)(num2);
const multiply = compose;
const power = x => p => p(multiply(x))(one);

const zero = f => x => x;
const one = f => x => f(x);
const two = succ(one);
const three = succ(two);
const four = succ(three);
const five = succ(four);
const six = succ(five);
const seven = succ(six);
const eight = succ(seven);
const nine = succ(eight);
const ten = succ(nine);
const hundred = power(ten)(one);
const thousand = power(ten)(two);

// for testing pupose
const toJsNum = num => num(acc => acc + 1)(0);
const myJsNumber = toJsNum(power(ten)(four));
console.log(myJsNumber);
