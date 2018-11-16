const { compose, K } = require('./utils');
const boolean = require('./boolean');
const { pair, first, second } = require('./pair');

const isZero = num => num(K(boolean.F))(boolean.T);

const zero = () => x => x;

const succ = num => f => compose(f)(num(f));

const phi = p => pair(second(p))(succ(second(p)));
const pred = num => first(num(phi)(pair(zero)(zero)));


const add = num1 => num2 => num1(succ)(num2);
const multiply = compose;
const power = x => p => p(multiply(x))(one);
const subtract = num1 => num2 => num2(pred)(num1);

const isLessOrEqual = num1 => num2 => isZero(subtract(num1)(num2));
const isEqual = num1 => num2 => boolean.and(isLessOrEqual(num1)(num2))(isLessOrEqual(num2)(num1));
const isGreater = num1 => num2 => boolean.not(isLessOrEqual(num1)(num2));
const isGreaterOrEqual = num1 => num2 => boolean.or(isGreater(num1)(num2))(isEqual(num1)(num2));
const isLess = num1 => num2 => boolean.and(
  isLessOrEqual(num1)(num2),
)(
  boolean.not(isEqual(num1)(num2)),
);

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
const myJsBool = boolean.toJsBool(isEqual(three)(three));
console.log(myJsBool);
